const express = require('express');
const { userController } = require('../controllers/userController');
const router = express.Router();

// Routes for different APIs
router.get("/user", userController)


// Exporting this router
module.exports = router