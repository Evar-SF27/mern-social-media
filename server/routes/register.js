import express from 'express'
import handleRegister from '../controllers/registerController'

const registerRouter = express.Router()

router.post('/', handleRegister)

export default registerRouter