import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import helmet from 'hemlet'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'
import multer from 'multer'
import connectDB from './config/dbConfig'
import authRouter from './routes/auth'
import handleRegister from './controllers/registerController'

// CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PORT = process.env.PORT || 6001
dotenv.config()
const app = express()

// Calling the Mongoose Config function
connectDB()

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
app.use('/auth', authRouter)

// Mongoose Setup Once
mongoose.connection.once("open", () => {
    app.listen(PORT, () => console.log(`Connected to PORT ${PORT}`))
} )
