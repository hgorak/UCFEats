const ItemList = require('../models/itemModel');
const LocationList = require('../models/locationModel');

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
  console.log(store._id);

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

module.exports = {
  getItems,
  getItem
}
