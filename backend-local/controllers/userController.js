const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/emailSender');

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

    // Send email for verification
    sendEmail(email);

    res.status(200).json({email, first_name, last_name, token});
  }

  catch (error) {
    res.status(400).json({error: error.message});
  }
};

const deleteUser = async(req, res) => {

  try {
    const id = req.user._id;
    const result = await User.findOneAndDelete({_id: id});
    res.status(200).json(result)
  }

  catch (error) {
    res.status(404).json({message: 'User not found'});
  }
};

module.exports = { loginUser, registerUser, deleteUser };
