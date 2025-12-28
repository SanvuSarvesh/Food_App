const express = require('express');
const { route } = require('./routes');
const { getUserInfo, updateUserInfo } = require('../controllers/userController');
const authMiddlewares = require('../middlewares/authMiddlewares');
const router = express.Router();

// Routes
// Get User | GET
router.get("/get-user", authMiddlewares, getUserInfo);

// Update User | PUT
router.put("/update-user/:userId", authMiddlewares, updateUserInfo);
module.exports = router;