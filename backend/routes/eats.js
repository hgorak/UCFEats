const express = require('express');
const {
  getEats,
  getRecentEats,
  addEat,
  deleteEat,
  dayEats,
  getDailyMacros,
  setGoalMacros,
  getGoals,
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

// Delete an Eat from the User
router.delete('/', deleteEat);

// Gets the user's eats from today
router.get('/day', dayEats)

// Get the user's macros so far in the day
router.get('/dailyMacros', getDailyMacros);

// Get the user's macro goals
router.get('/macroGoals', getGoals);

// Set macro goals
router.post('/setMacroGoal', setGoalMacros);

// Add a favorite eat
router.post('/favorite', addFavorite);

// Delete a favorite eat
router.delete('/favorite', deleteFavorite);

// Gets the user's favorite eats
router.get('/favorite', getFavorites);

module.exports = router;
