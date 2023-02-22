import bcrypt from 'bcrypt'
import jwt from 'jwt'
import mongoose from 'mongoose'
import User from '../models/User'

const handleLogin = async (req, res) => {
    try {
        // Receiving credentials from the request
        const { email, password } = req.body
        if (!email || !password) return res.status(400).json({ "message": "Incomplete credentials" })

        // Retrieving the user 
        const user = await User.findOne({ email }).exec()
        if(!user) return res.status(400).json({ "message": "User does not exist" })

        // Authenticating the user
        const matchPassword = await bcrypt.compare(password, user.password)

        if (matchPassword) {
            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET_KEY,
                { expires: '30s' }
            )
            delete user.password
            res.status(200).json({ token, user })
        } else {
            res.sendStatus(401)
        }
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
}

export default handleLogin