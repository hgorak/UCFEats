const express = require('express');

// Controller functions
const {
  loginUser,
  registerUser,
  verifyEmail,
  deleteUser,
  resetUserPasswordSetup,
  resetUserPassword
} = require('../controllers/userController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Login
router.post('/login', loginUser);

// Signup
router.post('/register', registerUser);

// Verify Email
router.get('/verification/:token', verifyEmail);

// Forgot password setup
router.post('/reset', resetUserPasswordSetup);

// Change forgotten password
router.patch('/reset/:token', resetUserPassword);

// Require authentication to use delete
router.use(requireAuth);

// Delete
router.delete('/', deleteUser);

module.exports = router;
