const ItemList = require('../models/itemModel');
const LocationList = require('../models/locationModel');

// Get all items
const getAllItems = async (req, res) => {
  const items = await ItemList.find().sort({Name: 1}).collation({ locale: "en", caseLevel: true });

  if (items === null)
    return res.status(401).json({error: 'There are no items in the database'});

  // Extract location IDs from items and get locations
  const locationIDs = items.map(item => item.loc_id);
  const locations = await LocationList.find({_id: {$in: locationIDs}});

  // Create an array of location names for each item
  const locationNames = items.map(item => {
    const location = locations.find(loc => loc._id.equals(item.loc_id));
    return location.Name;
  });

  // Turn into javascript array
  const itemsArray = items.map(item => item.toObject());

  // Create an array of location names for each item
  const updatedItems = itemsArray.map((item, i) => {
    item.locationName = locationNames[i];
    return item;
  });

  res.status(200).json(updatedItems);
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
  const items = await ItemList.find({loc_id: store._id}).sort({Name: 1}).collation({ locale: "en", caseLevel: true });

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
  const item = await ItemList.findOne({Name: itemName, loc_id: store._id});

  if (item === null)
    return res.status(404).json({error: 'Item Does Not Exist'});

  res.status(200).json(item);
};

module.exports = {
  getAllItems,
  getItems,
  getItem,
}
