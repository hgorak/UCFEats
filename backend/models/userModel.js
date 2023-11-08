const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  first_name: {
    type: String,
    required: true
  },

  last_name: {
    type: String,
    required: true
  },

  stores: {
    type: Array,
    "default": [],
    required: false
  },

  eats: {
    type: Array,
    "default": [],
    required: false
  }
}, {collection: 'Users'});

// Static signup method
userSchema.statics.signup = async function(email, password, first_name, last_name) {
  // Ensure all fields are filled in
  if (!email || !password || !first_name || !last_name)
    throw Error('All fields must be filled');

  // Ensure it's a valid email
  if (!validator.isEmail(email))
    throw Error('Email is not valid');

  // Check if password is strong enough
  if (!validator.isStrongPassword(password))
    throw Error('Password must be at least 8 digits long and contain at least one uppercase letter, one lowercase letter, one number, and one special character');

  // Ensures that user doesn't already have an account
  const exists = await this.findOne({ email });

  if (exists)
    throw Error('Email is already in use');

  // Salt and then hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hashedPass, first_name, last_name });

  return user;
}

// Static login method
userSchema.statics.login = async function(email, password) {
  // Ensure all fields are filled in
  if (!email || !password)
    throw Error('All Fields Must Be Filled');
  
  // Try to find the email in the database
  const user = await this.findOne({ email });

  if (!user)
    throw Error('No Account Found With That Email');

  const match = await bcrypt.compare(password, user.password);

  if (!match)
    throw Error('Incorrect Password');

  return user;
}

module.exports = mongoose.model('User', userSchema);
