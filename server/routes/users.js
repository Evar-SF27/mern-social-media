const express = require('express')
const { getUser, getUserFriends, addRemoveFriend } = require('../controllers/users.js')
const { verifyToken } = require('../middlewares/verifyJWT.js')

const router = express.Router()

router.get("/:id", verifyToken, getUser)
router.get("/:id/friends", verifyToken, getUserFriends)
router.patch("/:id/:friendId", verifyToken, addRemoveFriend)

module.exports = router