const EatsList = require('../models/eatsModel');
const ItemList = require('../models/itemModel');
const LocationList = require('../models/locationModel.js');
const User = require('../models/userModel');

/* Basic Eat Operations */
// Gets the user's Eats
const getEats = async (req, res) => {
  // Gets user
  const user = await User.findById(req.user._id);

  if (user === null)
    return res.status(404).json({error: 'User does not exist or has invalid token'});
  
  // Returns their stores
  res.status(200).json(user.eats);
};

// Get the user's recent eats
const getRecentEats = async (req, res) => {
  const userID = req.user._id;

  const eats = await EatsList.find({user_id: userID}).sort({updatedAt: -1});

  // Only get most recent eats
  const numEats = 10;
  const newEats = eats.slice(0, numEats);

  // Extract item IDs from newEats arr and get items
  const itemIDs = newEats.map(eat => eat.item_id);
  const items = await ItemList.find({_id: {$in: itemIDs}});

  // Map items to their timestamps
  const itemsSorted = itemIDs.map(itemID => {
    const sortedItem = items.find(item => item._id.equals(itemID));
    return sortedItem;
  });

  // Extract location IDs from items and get locations
  const locationIDs = itemsSorted.map(item => item.loc_id);
  const locations = await LocationList.find({_id: {$in: locationIDs}});

  // Create an array of location names for each item
  const locationNames = itemsSorted.map(item => {
    const location = locations.find(loc => loc._id.equals(item.loc_id));
    return location.Name;
  });

  const recentEats = newEats.map((eat, index) => ({
    timestamp: eat.updatedAt,
    itemName: itemsSorted[index].Name,
    locationName: locationNames[index]
  }));

  res.status(200).json(recentEats);
}

// Adds an eat
const addEat = async (req, res) => {
  const { name } = req.body;
  let emptyFields = [];

  /* Ensure fields aren't empty */
  if (!name)
    emptyFields.push('name');

  if (emptyFields.length > 0)
    return res.status(400).json({ error: 'Please fill in the required fields', emptyFields });

  try
  {
    /* Ensure item exists */
    // Find desired item
    const item = await ItemList.findOne({Name: name});

    // Return if the store doesn't exist
    if (item === null)
      return res.status(404).json({error: 'Item Does Not Exist'});

    /* Check if user already has item */
    // Get item's ID
    const itemID = item._id;

    // Gets user
    const user = await User.findById(req.user._id);
    
    // Get user's ID
    const userID = user._id;

    // Adds info to user
    let progress = user.dayProgress;
    progress[0] += item.Calories;
    progress[1] += item.Fat;
    progress[2] += item.Carbs;
    progress[3] += item.Protein;

    // Update progress for the day
    await User.findByIdAndUpdate(userID, {$set: {dayProgress: progress}});

    // Add to the records
    const response = await EatsList.create({user_id: userID, item_id: itemID});

    res.status(200).json(response);
  }

  catch (error)
  {
    res.status(400).json({error: error.message})
  }
};

// Deletes an Eat 
const deleteEat = async (req, res) => {
  const { name, time } = req.body;
  let emptyFields = [];

  /* Ensure fields aren't empty */
  if (!name)
    emptyFields.push('name');

  if (!time)
    emptyFields.push('time');

  if (emptyFields.length > 0)
    return res.status(400).json({ error: 'Please fill in the required fields', emptyFields });

  /* Ensure item exists */
  // Find desired item
  const item = await ItemList.findOne({Name: name});

  // Return if the item doesn't exit
  if (item === null)
    return res.status(404).json({error: 'Item Does Not Exist'});

  /* Check if user already has item */
  // Add locations id to eats
  const itemID = item._id;

  // Gets user
  const user = await User.findById(req.user._id);

  // Delete the Eat from the records
  const updateResponse = await EatsList.findOneAndDelete({user_id: req.user._id, item_id: itemID, createdAt: time});

  if (updateResponse === null)
    return res.status(401).json({error: 'User Does Not Have This Eat'});

  // Remove the macros
  let progress = user.dayProgress;
  progress[0] -= item.Calories;
  progress[1] -= item.Fat;
  progress[2] -= item.Carbs;
  progress[3] -= item.Protein;

  await User.findByIdAndUpdate(req.user._id, {$set: {dayProgress: progress}});

  res.status(200).json(updateResponse);
};

/* Eats by Time Period */
const dayEats = async (req, res) => {
  let start = new Date();
  start.setHours(0, 0, 0, 0);
  start.setMinutes(start.getMinutes());

  let end = new Date();
  end.setHours(23, 59, 59, 999);
  end.setMinutes(end.getMinutes());
  
  const eats = await EatsList.find({user_id: req.user._id, updatedAt: {$gte: start, $lt: end}}).sort({updatedAt: 1});

  // Extract item IDs from eats arr and get items
  const itemIDs = eats.map(eat => eat.item_id);
  const items = await ItemList.find({_id: {$in: itemIDs}});

  // Map items to their timestamps
  const itemsSorted = itemIDs.map(itemID => {
    const sortedItem = items.find(item => item._id.equals(itemID));
    return sortedItem;
  });

  // Extract location IDs from items and get locations
  const locationIDs = itemsSorted.map(item => item.loc_id);
  const locations = await LocationList.find({_id: {$in: locationIDs}});

  // Create an array of location names for each item
  const locationNames = itemsSorted.map(item => {
    const location = locations.find(loc => loc._id.equals(item.loc_id));
    return location.Name;
  });

  const dayEats = eats.map((eat, index) => ({
    timestamp: eat.updatedAt,
    itemName: itemsSorted[index].Name,
    locationName: locationNames[index]
  }));

  res.status(200).json(dayEats);
};

/* Macros */
const getDailyMacros = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user === null)
    return res.status(404).json({error: 'User does not exist or has invalid token'});

  res.status(200).json(user.dayProgress);
}

const setGoalMacros = async (req, res) => {
  const {calories, fat, carbs, protein} = req.body;

  const newGoals = [calories, fat, carbs, protein];

  await User.findByIdAndUpdate(req.user._id, {$set: {goals: newGoals}});

  res.status(200).json(newGoals);
}

const getGoals = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user === null)
    return res.status(404).json({error: 'User does not exist or has invalid token'});

  res.status(200).json(user.goals);
}

/* Favorite Operations */
// Add Favorite
const addFavorite = async (req, res) => {
  const { name } = req.body;
  let emptyFields = [];

  /* Ensure fields aren't empty */
  if (!name)
    emptyFields.push('name');

  if (emptyFields.length > 0)
    return res.status(400).json({ error: 'Please fill in the required fields', emptyFields });

  try
  {
    /* Ensure item exists */
    // Find desired item
    const item = await ItemList.findOne({Name: name});

    // Return if the item doesn't exist
    if (item === null)
      return res.status(404).json({error: 'Item Does Not Exist'});

    const user = await User.findById(req.user._id);

    if (user === null)
      return res.status(404).json({error: 'User does not exist or has invalid token'});

    // If the user doesn't have this favorites: Throw error
    if (user.favorites.includes(item._id))
      return res.status(401).json({error: 'User Already Has This Favorite'});

    // Adds item to user's favorites
    await User.findByIdAndUpdate(req.user._id, {$push: {favorites: item._id}});
    
    /* Get an updated list of the user's favorites to return */
    const updatedUser = await User.findById(req.user._id);
    const updatedFavorites = updatedUser.favorites;
  
    res.status(200).json(updatedFavorites);
  }

  catch (error)
  {
    res.status(401).json({error: error.message});
  }
};

// Delete Favorite
const deleteFavorite = async (req, res) => {
  const { name } = req.body;

  /* Ensure item exists */
  // Find desired item
  const item = await ItemList.findOne({Name: name});

  // Return if the item doesn't exit
  if (item === null)
    return res.status(404).json({error: 'Item Does Not Exist'});

  const user = await User.findById(req.user._id);

  if (user === null)
    return res.status(404).json({error: 'User does not exist or has invalid token'});

  // If the user doesn't have this favorites: Throw error
  if (!user.favorites.includes(item._id))
    return res.status(401).json({error: 'User Does Not Have This Favorite'});

  // Delete the Favorite
  await User.findByIdAndUpdate(req.user._id, {$pull: {favorites: item._id}});

  /* Get an updated list of the Eats to return */
  const updatedUser = await User.findById(req.user._id);
  const updatedFavorites = updatedUser.favorites;
  
  res.status(200).json(updatedFavorites);
};

// Get Favorites
const getFavorites = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user === null)
    return res.status(404).json({error: 'User does not exist or has invalid token'});

  res.status(200).json(user.favorites);
};

module.exports = {
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
}
