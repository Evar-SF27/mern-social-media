const express = require('express')
const { getFeedPosts, getUserPosts, likePost } = require('../controllers/postController')
const router = express.Router()

router.get("/", getFeedPosts)
router.get("/:userId", getUserPosts)
router.patch("/:id/like", likePost)

module.exports = router