const express = require('express');

// Controller functions
const { loginUser, registerUser } = require('../controllers/userController');

const router = express.Router();

// Login
router.post('/login', loginUser);

// Signup
router.post('/register', registerUser);

module.exports = router;
