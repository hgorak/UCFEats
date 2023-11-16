const EatsList = require('../models/eatsModel');
const ItemList = require('../models/itemModel');
const LocationList = require('../models/locationModel.js');
const User = require('../models/userModel');

// Gets the user's Eats
const getEats = async (req, res) => {
  // Gets user
  const user = await User.findById(req.user._id);
  
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

    // If the user already has the item: Don't add
    if (user.eats.includes(itemID))
    {
      await EatsList.findOneAndUpdate({user_id: userID, item_id: itemID}, {$inc: {Quantity: 1}});
      return res.status(200).json({message: 'Quantity has been updated'});
    }

    // Adds store to user
    await User.findByIdAndUpdate(userID, {$push: {eats: itemID}});
    
    // Add to the records
    await EatsList.create({user_id: userID, item_id: itemID});

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
const deleteEat = async (req, res) => {
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

  // Delete the Eat from the records
  await EatsList.findOneAndDelete({user_id: req.user._id, item_id: itemID});

  /* Get an updated list of the Eats to return */
  const updatedUser = await User.findById(req.user._id);
  const finalEats = updatedUser.eats;
  
  res.status(200).json(finalEats);
};

module.exports = {
  getEats,
  getRecentEats,
  addEat,
  deleteEat
}
