import express from 'express'
import handleLogin from '../controllers/authController'

const authRouter = express.Router()

router.post('/', handleLogin)

export default authRouter