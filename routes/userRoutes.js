const express = require('express');
const { route } = require('./routes');
const { getUserInfo } = require('../controllers/userController');
const authMiddlewares = require('../middlewares/authMiddlewares');
const router = express.Router();

// Routes
// Get User | GET
router.get("/get-user", authMiddlewares, getUserInfo);

module.exports = router;