import bcrypt from 'bcrypt'
import jwt from 'jwt'
import mongoose from 'mongoose'
import User from '../models/User'

const handleRegister = async (req, res) => {
    try {
        // Receiving credentials from the request
        const { firstName, lastName, email, password, picturePath, friends, location, occupation, viewedProfile, impressions } = req.body
        if (!firstName || !lastName || !email || !password ) return res.status(401).json({ "message": "Incomplete credentials" })

        // Checking for duplicate user
        const duplicateUser = await mongoose.findOne({ email }).exec()
        if (duplicateUser) return res.status(409).json({ "message": "User with this email already exists" })

        // Encrypting the password before saving to database
        const salt = await bcrypt.genSalt()
        const hashedPassword = bcrypt.hash(password, salt)

        // Creating a new user instance in the database
        await User.create({
            firstName, 
            lastName, 
            email, 
            hashedPassword, 
            picturePath, 
            friends, 
            location, 
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        })

        res.status(201).json({ "message": "User created successfully" })
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
}

export default handleRegister