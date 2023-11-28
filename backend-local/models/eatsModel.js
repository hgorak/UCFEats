const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eatsSchema = new Schema({
  user_id:
  {
    type: ObjectId,
    required: true
  },

  item_id:
  {
    type: ObjectId,
    required: true
  },

  Quantity:
  {
    type: Number,
    required: false,
    default: 1
  }
}, {collection: 'Eats', timestamps: true});

module.exports = mongoose.model("Eats", eatsSchema);
