const express = require('express');
const {
  getAllItems,
  getItems,
  getItem,
} = require('../controllers/itemController');

const router = express.Router();

// Get all items
router.get('/all', getAllItems);

// Get all locations
router.post('/', getItems);

// Gets specified item from location
router.post('/name', getItem);

module.exports = router;
