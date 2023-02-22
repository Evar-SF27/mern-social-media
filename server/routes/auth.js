import express from 'express'
import handleLogin from '../controllers/authController'

const authRouter = express.Router()

router.post("/login", handleLogin)

export default authRouter