const express = require('express');
const { registerNewUser, userLogin } = require('../controllers/authController');
const router = express.Router();

// Register URL
router.post("/register", registerNewUser);

// Login URL
router.post("/login", userLogin);
module.exports = router;