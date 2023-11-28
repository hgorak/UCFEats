const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const locationSchema = new Schema({
  Name:
  {
    type: String,
    required: true
  }
}, {collection: 'Locations'}, { timestamps: true });

module.exports = mongoose.model("Location", locationSchema);
