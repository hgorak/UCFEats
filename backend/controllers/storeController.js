const LocationList = require('../models/locationModel.js');
const User = require('../models/userModel');
const mongoose = require('mongoose');

// Get all of the locations
const getAllLocations = async (req, res) => {
  const locations = await LocationList.find({});

  res.status(200).json(locations);
}

// Get all of the user's locations
const getUserLocations = async (req, res) => {
  // Gets user
  const user = await User.findById(req.user._id);
  
  // Returns their stores
  res.status(200).json(user.stores);
};

// Gets one location
const getLocation = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({error: "That Location Does Not Exist"});

  const store = await LocationList.findById(id);

  if (!store)
    return res.status(404).json({error: "No store with that id"});

  res.status(200).json(store);
};

// Adds a location to the user
const addLocation = async (req, res) => {
  const { name } = req.body;
  let emptyFields = [];

  /* Ensure fields aren't empty */
  if (!name)
    emptyFields.push('name');

  if (emptyFields.length > 0)
    return res.status(400).json({ error: 'Please fill in the required fields', emptyFields });

  try
  {
    /* Ensure store exists */
    // Find desired store
    const store = await LocationList.findOne({Name: name});

    // Return if the store doesn't exist
    if (store === null)
      return res.status(404).json({error: 'Store Does Not Exist'});

    /* Check if user already has store */
    // Add locations id to stores
    const storeID = store._id;

    // Gets user
    const user = await User.findById(req.user._id);

    // If the user already has the store: Don't add
    if (user.stores.includes(storeID))
      return res.status(401).json({error: 'User Already Has This Store'});

    // Adds store to user
    await User.findByIdAndUpdate(req.user._id, {$push: {stores: storeID}});

    /* Get an updated list of the stores to return */
    const updatedUser = await User.findById(req.user._id);
    const finalStores = updatedUser.stores;
  
    res.status(200).json(finalStores);
  }

  catch (error)
  {
    res.status(400).json({error: error.message})
  }
};

// Deletes a location
const deleteLocation = async(req, res) => {
  const { name } = req.body;

  /* Ensure store exists */
  // Find desired store
  const store = await LocationList.findOne({Name: name});

  // Return if the store doesn't exit
  if (store === null)
    return res.status(404).json({error: 'Store Does Not Exist'});

  /* Check if user already has store */
  // Add locations id to stores
  const storeID = store._id;

  // Gets user
  const user = await User.findById(req.user._id);

  // If the user doesn't have the store: Throw error
  if (!user.stores.includes(storeID))
    return res.status(401).json({error: 'User Does Not Have This Store'});

  // Delete the store
  await User.findByIdAndUpdate(req.user._id, {$pull: {stores: storeID}});

  /* Get an updated list of the stores to return */
  const updatedUser = await User.findById(req.user._id);
  const finalStores = updatedUser.stores;
  
  res.status(200).json(finalStores);
};

// Updates the locations
const updateLocations = async (req, res) => {
  const { locationNames } = req.body;

  /* Ensure store exists */
  // Find desired store
  let newStores = new Array();

  for (const locationName of locationNames)
  {
    const store = await LocationList.findOne({Name: locationName})

    if (store === null)
    {
      res.status(404).json({error: locationName + ' not found'});
      continue;
    }

    const storeID = store._id
    newStores.push(storeID)
  }

  // Delete the store
  await User.findByIdAndUpdate(req.user._id, {$set: {stores: newStores}});

  /* Get an updated list of the stores to return */
  const updatedUser = await User.findById(req.user._id);
  const finalStores = updatedUser.stores;
  
  res.status(200).json(finalStores);
};


module.exports = {
  getAllLocations,
  getUserLocations,
  getLocation,
  addLocation,
  deleteLocation,
  updateLocations
};
