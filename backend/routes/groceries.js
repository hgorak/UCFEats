const express = require('express');
const {
  getGroceries,
  getGrocery,
  createGrocery,
  deleteGrocery,
  updateGrocery
} = require('../controllers/groceryController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Require authentication for all grocery routes
router.use(requireAuth);

// Get all groceries
router.get('/', getGroceries);

// Gets specified grocery
router.get('/:id', getGrocery);

// Post a new grocery
router.post('/', createGrocery);

// Delete a new grocery
router.delete('/:id', deleteGrocery);

// Update a new grocery
router.patch('/:id', updateGrocery);

module.exports = router;
