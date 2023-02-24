const express = require('express')
const { getUser, getUserFriends, addRemoveFriend } = require('../controllers/users.js')

const router = express.Router()

router.get("/:id", getUser)
router.get("/:id/friends", getUserFriends)
router.patch("/:id/:friendId", addRemoveFriend)

module.exports = router