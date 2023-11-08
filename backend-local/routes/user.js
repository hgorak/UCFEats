const express = require('express');

// Controller functions
const { loginUser, registerUser, deleteUser } = require('../controllers/userController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Login
router.post('/login', loginUser);

// Signup
router.post('/register', registerUser);

// Require authentication to use delete
router.use(requireAuth);

// Delete
router.delete('/', deleteUser);

module.exports = router;
