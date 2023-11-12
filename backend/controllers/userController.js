// Model
const User = require('../models/userModel');

// Libraries
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');

// Functions
const sendVerificationEmail = require('../utils/verificationEmailSender');
const sendResetEmail = require('../utils/resetEmailSender');

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' });
}

// User login
const loginUser = async(req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const first_name = user.first_name;
    const last_name = user.last_name;

    // Create token for user
    const token = createToken(user._id);

    res.status(200).json({email, first_name, last_name, token});
  }

  catch (error) {
    res.status(400).json({error: error.message});
  }
};

// Register user
const registerUser = async(req, res) => {
  const {email, password, first_name, last_name} = req.body;

  try {
    const user = await User.signup(email, password, first_name, last_name);

    // Create token for user
    const token = createToken(user._id);

    // Send verification email
    sendVerificationEmail(user);

    res.status(200).json({email, first_name, last_name, token});
  }

  catch (error) {
    res.status(400).json({error: error.message});
  }
};

// Email verification processing
const verifyEmail = async (req, res) => {
  const { token } = req.params;

  // Get user
  const user = await User.findOne({verification_token: token});

  // Check if any user has the token
  if (user === null)
  {
    res.status(404).json({message: 'Token does not exist. Uh oh'});
    return;
  }

  // Ensure jwt isn't expired
  try {
    jwt.verify(token, process.env.SECRET);
  }
  
  // If it is, remove the token and return error
  catch (error) {
    await User.findByIdAndUpdate(user._id, {$set: {verification_token: ""}});
    res.status(402).json({error: 'Token is expired. We will send you a new link now'});
    sendVerificationEmail(user.email);
    return;
  }

  // Make user verified
  await User.findByIdAndUpdate(user._id, {$set: {verified: true, verification_token: ""}});

  res.status(200).json({message: 'User is now verified'});
};

// Delete user
const deleteUser = async(req, res) => {

  try {
    const id = req.user._id;
    const result = await User.findOneAndDelete({_id: id});
    res.status(200).json(result)
  }

  catch (error) {
    res.status(404).json({message: 'User Not Found'});
  }
};

/* Password Reset */

// Send email reset link to user
const resetUserPasswordSetup = async(req, res) => {
  const {email} = req.body;

  const validEmail = await User.findOne({email: email}, 'email');

  if (validEmail === null)
    res.status(404).json({message: 'No Account Found With That Email'});

  sendResetEmail(validEmail);

  res.status(200).json();
}

// Reset user's password
const resetUserPassword = async(req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  // Get user
  const user = await User.findOne({reset_token: token});

  // Check if any user has the token
  if (user === null)
  {
    res.status(404).json({message: 'Token does not exist. Please try the reset process again'});
    return;
  }

  // Ensure jwt isn't expired
  try {
    jwt.verify(token, process.env.SECRET);
  }
  
  // If it is, remove the token and return error
  catch (error) {
    await User.findByIdAndUpdate(user._id, {$set: {reset_token: ""}});
    res.status(402).json({error: 'Token is expired'});
    return;
  }

  // Ensure new password isn't their old password
  const match = await bcrypt.compare(password, user.password);
  if (match)
  {
    res.status(410).json({error: 'New password cannot be old password'});
    return;
  }


  // Make sure new password is valid
  if (!validator.isStrongPassword(password))
  {
    const errorMessage = 'Password must be at least 8 digits long and contain at least one uppercase letter, one lowercase letter, one number, and one special character';
    res.status(411).json({error: errorMessage});
    return;
  }

  // Salt and hash new password
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);


  // Update the password and remove reset token
  await User.findByIdAndUpdate(user._id, {$set: {password: hashedPass, reset_token: ""}});

  res.status(200).json({message: 'Password has been updated successfully'});
}

module.exports = {
  loginUser,
  registerUser,
  verifyEmail,
  deleteUser,
  resetUserPasswordSetup,
  resetUserPassword
};
