const express = require('express');
const {
  getAllItems,
  getItems,
  getItem,
  getEats,
  addEat,
  deleteEat
} = require('../controllers/itemController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Get all items
router.get('/all', getAllItems);

// Get all locations
router.post('/', getItems);

// Gets specified item from location
router.post('/name', getItem);

// Require authentication for adding and getting eats
router.use(requireAuth);

// Add an eat to the user
router.post('/add', addEat);

// Get all of the user's Eats
router.get('/', getEats);

// Delete an Eat from the User
router.delete('/', deleteEat);

module.exports = router;
