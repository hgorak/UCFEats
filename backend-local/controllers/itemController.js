const ItemList = require('../models/itemModel');
const LocationList = require('../models/locationModel');
const User = require('../models/userModel');

// Get all items
const getAllItems = async(req, res) => {
  const items = await ItemList.find({});

  if (items === null)
    return res.status(401).json({error: 'There are no items in the database'});

  res.status(200).json(items);
};

// Get all items from location
const getItems = async (req, res) => {
  const { name } = req.body;

  /* Get Store ID */
  const store = await LocationList.findOne({Name: name});

  // Return if the store doesn't exist
  if (store === null)
    return res.status(404).json({error: 'Store Does Not Exist'});

  // Gets items from store
  const items = await ItemList.find({loc_id: store._id});

  // Returns the stores' items
  res.status(200).json(items);
};

// Gets one item
const getItem = async (req, res) => {
  const { storeName, itemName } = req.body;

  /* Get Store ID */
  const store = await LocationList.findOne({Name: storeName});

  // Return if the store doesn't exist
  if (store === null)
    return res.status(404).json({error: 'Store Does Not Exist'});

  // Get item
  const item = await ItemList.find({Name: itemName, loc_id: store._id});

  res.status(200).json(item);
};

// Gets the user's Eats
const getEats = async (req, res) => {
  // Gets user
  const user = await User.findById(req.user._id);
  
  // Returns their stores
  res.status(200).json(user.eats);
};

// Adds an Eat to the user
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
    // Add locations id to stores
    const itemID = item._id;

    // Gets user
    const user = await User.findById(req.user._id);

    // If the user already has the item: Don't add
    if (user.eats.includes(itemID))
      return res.status(401).json({error: 'User Already Has This Item'});

    // Adds store to user
    await User.findByIdAndUpdate(req.user._id, {$push: {eats: itemID}});

    /* Get an updated list of the stores to return */
    const updatedUser = await User.findById(req.user._id);
    const finalEats = updatedUser.eats;
  
    res.status(200).json(finalEats);
  }

  catch (error)
  {
    res.status(400).json({error: error.message})
  }
};

// Deletes an Eat 
const deleteEat = async(req, res) => {
  const { name } = req.body;

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

  // If the user doesn't have the Eat: Throw error
  if (!user.eats.includes(itemID))
    return res.status(401).json({error: 'User Does Not Have This Eat'});

  // Delete the Eat
  await User.findByIdAndUpdate(req.user._id, {$pull: {eats: itemID}});

  /* Get an updated list of the Eats to return */
  const updatedUser = await User.findById(req.user._id);
  const finalEats = updatedUser.eats;
  
  res.status(200).json(finalEats);
};

module.exports = {
  getAllItems,
  getItems,
  getItem,
  getEats,
  addEat,
  deleteEat
}
