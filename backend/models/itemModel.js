const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  Name:
  {
    type: String,
    required: true
  },

  Quantity:
  {
    type: Number,
    required: true
  },

  Brand:
  {
    type: String,
    required: true
  },

  Fat:
  {
    type: Number,
    required: true
  },

  Carbs:
  {
    type: Number,
    required: true
  },

  Protein:
  {
    type: Number,
    required: true
  },

  loc_id:
  {
    type: ObjectId,
    required: true
  }
}, {collection: 'Items'});

module.exports = mongoose.model("Item", itemSchema);
