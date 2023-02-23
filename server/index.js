const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const multer = require('multer')
const helmet = require('helmet')
const morgan = require('morgan')
const path = require('path')
const { fileURLToPath } = require('url')
const handleRegister = require('./controllers/registerController')

// CONFIGURATIONS
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)
const PORT = process.env.PORT || 6001
dotenv.config()
const app = express()

// Connecting the server to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})

// Middlewares
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())
app.use("/assets", express.static(path.join(__dirname, "public/assets")))

// Setting up the File Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimettype == "image/jpeg" || file.mimettype == "image/png") {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter })

// Routes with files
app.post('/auth/register', upload.single("picture"), handleRegister)

// Routes
app.use('/auth', require('./routes/auth'))
// app.use('/users', require('./routes/users'))

// Mongoose Setup Once
mongoose.connection.once("open", () => {
    app.listen(PORT, () => console.log(`Connected to PORT ${PORT}`))
} )
