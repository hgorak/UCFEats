const express = require('express');
const {
  getEats,
  getRecentEats,
  addEat,
  deleteEat,
  dayEats,
  addFavorite,
  deleteFavorite,
  getFavorites
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

// Gets the user's eats from today
router.get('/day', dayEats)

// Delete an Eat from the User
router.delete('/', deleteEat);

// Add a favorite eat
router.post('/favorite', addFavorite);

// Delete a favorite eat
router.delete('/favorite', deleteFavorite);

// Gets the user's favorite eats
router.get('/favorite', getFavorites);

module.exports = router;
