const express = require('express');
const {
  getItems,
  getItem
} = require('../controllers/itemController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Require authentication for all store routes
router.use(requireAuth);

// Get all locations
router.get('/', getItems);

// Gets specified grocery
router.get('/name', getItem);

module.exports = router;
