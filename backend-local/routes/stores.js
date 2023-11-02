const express = require('express');
const {
  getLocations,
  getLocation,
  addLocation,
  deleteLocation,
  updateLocations
} = require('../controllers/storeController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Require authentication for all store routes
router.use(requireAuth);

// Get all locations
router.get('/', getLocations);

// Gets specified grocery
router.get('/:id', getLocation);

// Post a location to the user
router.post('/addLocation', addLocation);

// Delete a new grocery
router.delete('/deleteLocation', deleteLocation);

// Update a new grocery
router.patch('/', updateLocations);

module.exports = router;
