const User = require('../models/User')

const getUser = async(req, res) => {
    const { id } = req.params
    if(!id) return res.status(400).json({ "message": "ID is needed"})

    try {
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
}

const getUserFriends = async(req, res) => {
    const { id } = req.params
    if(!id) return res.status(400).json({ "message": "ID is needed"})

    try {
        const user = await User.findById(id)
        const friends = await Promise.all(
            user.friends.map(id => User.findById(id))
        )
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath }
            }
        )

        res.status(200).json(formattedFriends)
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
}

const addRemoveFriend = async(req, res) => {
    const { id, friendId } = req.params
    if(!id || !friendId) return res.status(400).json({ "message": "ID is needed"})

    try {
        const user = await User.findById(id)
        const friend = await User.findById(friendId)

        if(user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId)
            friend.friends = friend.friends.filter((userId) => userId !== id)
        } else {
            user.friends.push(friendId)
            friend.friends.push(id)
        }
        
        await user.save()
        await friend.save()

        const friends = await Promise.all(
            user.friends.map(id => User.findById(id))
        )
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath }
            }
        )

        res.status(200).json(formattedFriends)
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
}

module.exports = { getUser, getUserFriends, addRemoveFriend}