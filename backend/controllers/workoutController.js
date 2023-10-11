const Workout = require('../models/workoutModel.js');
const mongoose = require('mongoose');

// Get all workouts
const getWorkouts = async (req, res) => {
  // Sorts all workouts in descending order
  const workouts = await Workout.find({}).sort({title: 1});

  res.status(200).json(workouts);
};

// Gets one workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({error: "That Item Isn't On Your List"});

  const workout = await Workout.findById(id);

  if (!workout)
    return res.status(404).json({error: "No item with that id"});

  res.status(200).json(workout);
};

// Create a workout
const createWorkout = async (req, res) => {
  const {title, load, reps} = req.body;

  let emptyFields = [];

  if (!title)
    emptyFields.push('title');

  if (!load)
    emptyFields.push('load');

  if (!reps)
    emptyFields.push('reps');

  if (emptyFields.length > 0)
    return res.status(400).json({ error: 'Please fill in the required fields', emptyFields });

  try
  {
    const workout = await Workout.create({title, load, reps});
    res.status(200).json(workout);
  }

  catch (error)
  {
    res.status(400).json({error: error.message})
  }
};

// Delete a workout
const deleteWorkout = async(req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({error: "No such workout"});

  const workout = await Workout.findByIdAndDelete(id);

  if (!workout)
    return res.status(404).json({error: "No workout found with that id"});
  
  res.status(200).json(workout);
};

// Update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({error: "No such workout"});

  const workout = await Workout.findByIdAndUpdate(id, req.body);

  if (!workout)
    return res.status(404).json({error: "No workout found with that id"});

  res.status(200).json(workout);
};


module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
};
