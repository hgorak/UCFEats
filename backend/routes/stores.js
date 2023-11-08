const express = require('express');
const {
  getAllLocations,
  getUserLocations,
  getLocation,
  addLocation,
  deleteLocation,
  updateLocations
} = require('../controllers/storeController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Get all locations
router.get('/all', getAllLocations);

// Require authentication for all store routes
router.use(requireAuth);

// Get all user locations
router.get('/', getUserLocations);

// Gets specified grocery
router.get('/:id', getLocation);

// Post a location to the user
router.post('/addLocation', addLocation);

// Delete a new grocery
router.delete('/deleteLocation', deleteLocation);

// Update a new grocery
router.patch('/', updateLocations);

module.exports = router;
