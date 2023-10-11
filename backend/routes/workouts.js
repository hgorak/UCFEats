const express = require('express');
const {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
} = require('../controllers/workoutController.js');

const router = express.Router();

// Get all workouts
router.get('/', getWorkouts);

// Gets specified workout
router.get('/:id', getWorkout);

// Post a new workout
router.post('/', createWorkout);

// Delete a new workout
router.delete('/:id', deleteWorkout);

// Update a new workout
router.patch('/:id', updateWorkout);

module.exports = router;
