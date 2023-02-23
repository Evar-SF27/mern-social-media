const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const handleLogin = async (req, res) => {
    try {
        // Receiving credentials = require(the request
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
                { expiresIn: '30s' }
            )

            const refreshToken = jwt.sign(
                { "username": user._id },
                process.env.JWT_SECRET_KEY,
                { expiresIn: '1d' }
            )

            user.refreshToken = refreshToken
            await user.save()
            
            // Setting the refresh token as a secured httpOnly Cookie
            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 })
            
            // Converting the mongo object to normal object so as to 
            // remove password and refresh token from the user we are sending to to the front end
            const currentUser = user.toObject()
            delete currentUser.password
            delete currentUser.refreshToken

            res.status(200).json({ token, currentUser })
        } else {
            res.sendStatus(401)
        }
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
}

module.exports = handleLogin