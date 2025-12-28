const express = require('express');
const { userController, getUserInfo, updateUserInfo } = require('../controllers/userController');
const router = express.Router();

// Routes for different APIs
router.get("/user", userController)
router.get("/get-user", getUserInfo)
router.put("/update-user/:userId", updateUserInfo)


// Exporting this router
module.exports = router