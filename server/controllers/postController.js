const Post = require('../models/Post')
const User = require('../models/User')

const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body
        const user = await User.findById(userId)
        await Post.create({
            userId,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "location": user.location,
            description,
            "userPicturePath": user.picturePath,
            picturePath,
            "likes": {},
            "comments": []
        })

        const posts = await Post.find()

        res.status(201).json(posts)
    } catch (err) {
        res.status(409).json({ "message": err.message })
    }
}

const getFeedPosts = async (req, res) => {
    try {
        const posts = await Post.find()

        res.status(200).json(posts)
    } catch (err) {
        res.status(404).json({ "message": err.message })
    }
}

const getUserPosts = async (req, res) => {
    const { userId } = req.params
    if (!userId) return res.status(400).json({ "message": "ID is absent" })

    try {
        const posts = await Post.findById({ userId })

        res.status(200).json(posts)
    } catch (err) {
        res.status(404).json({ "message": err.message })
    }
}

const likePost = async (req, res) => {
    const { id } = req.params
    const { userId } = req.body
    if (!id || !userId) return res.status(400).json({ "message": "ID is absent" })

    try {
        const post = await Post.findById({ id })
        const isLiked = post.likes.includes(userId)

        if (isLiked) {
            post.likes.delete(userId)
        } else {
            post.likes.set(userId, true)
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: true },
            { new: true }
        )

        res.status(200).json(updatedPost)
    } catch (err) {
        res.status(404).json({ "message": err.message })
    }
}

module.exports = {createPost, getFeedPosts, getUserPosts, likePost}