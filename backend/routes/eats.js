const express = require('express');
const {
  getEats,
  getRecentEats,
  addEat,
  deleteEat,
} = require('../controllers/eatsController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Require authentication for all record transactions
router.use(requireAuth);

// Add an eat to the user
router.post('/add', addEat);

// Get all of the user's Eats
router.get('/', getEats);

// Get user's most recent Eats
router.get('/recent', getRecentEats);

// Delete an Eat from the User
router.delete('/', deleteEat);

module.exports = router;
