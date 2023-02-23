const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('../models/User')

const handleRegister = async (req, res) => {
    try {
        // Receiving credentials = require(the request
        const { firstName, lastName, email, password, picturePath, friends, location, occupation, viewedProfile, impressions } = req.body
        if (!firstName || !lastName || !email || !password ) return res.status(400).json({ "message": "Incomplete credentials" })

        // Checking for duplicate user
        const duplicateUser = await User.findOne({ email }).exec()
        if (duplicateUser) return res.status(409).json({ "message": "User with this email already exists" })

        // Encrypting the password before saving to database
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        // Creating a new user instance in the database
        await User.create({
            firstName, 
            lastName, 
            email, 
            "password": hashedPassword, 
            picturePath, 
            friends, 
            location, 
            occupation,
            "viewedProfile": Math.floor(Math.random() * 10000),
            "impressions": Math.floor(Math.random() * 10000)
        })

        res.status(201).json({ "message": "User created successfully" })
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
}

module.exports =  handleRegister