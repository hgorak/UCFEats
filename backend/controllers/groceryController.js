const GroceryList = require('../models/groceryModel.js');
const mongoose = require('mongoose');

// Get all groceries
const getGroceries = async (req, res) => {
  const user_id = req.user._id;

  // Sorts all groceries in descending order
  const groceries = await GroceryList.find({ user_id }).sort({name: 1}).collation({ locale: "en", caseLevel: true });

  res.status(200).json(groceries);
};

// Gets one grocery
const getGrocery = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({error: "That Item Isn't On Your List"});

  const item = await GroceryList.findById(id);

  if (!item)
    return res.status(404).json({error: "No item with that id"});

  res.status(200).json(item);
};

// Create a grocery
const createGrocery = async (req, res) => {
  const {name, quantity, brand} = req.body;
  let emptyFields = [];

  if (!name)
    emptyFields.push('name');

  if (!quantity)
    emptyFields.push('quantity');

  if (!brand)
    emptyFields.push('brand');

  if (emptyFields.length > 0)
    return res.status(400).json({ error: 'Please fill in the required fields', emptyFields });

  try
  {
    const user_id = req.user._id;
    const item = await GroceryList.create({name, quantity, brand, user_id});
    res.status(200).json(item);
  }

  catch (error)
  {
    res.status(400).json({error: error.message})
  }
};

// Delete a grocery
const deleteGrocery = async(req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({error: "No such item"});

  const item = await GroceryList.findByIdAndDelete(id);

  if (!item)
    return res.status(404).json({error: "No item found with that id"});
  
  res.status(200).json(item);
};

// Update a grocery
const updateGrocery = async (req, res) => {
  const {name, quantity, brand} = req.body;
  let emptyFields = [];

  if (!name)
    emptyFields.push('name');

  if (!quantity)
    emptyFields.push('quantity');

  if (!brand)
    emptyFields.push('brand');

  if (emptyFields.length > 0)
    return res.status(400).json({ error: 'Please fill in the required fields', emptyFields });


  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({error: "No such item"});

  const item = await GroceryList.findByIdAndUpdate(id, req.body);

  if (!item)
    return res.status(404).json({error: "No item found with that id"});

  res.status(200).json(item);
};


module.exports = {
  getGroceries,
  getGrocery,
  createGrocery,
  deleteGrocery,
  updateGrocery
};
