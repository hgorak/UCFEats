const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' }); // Token expires after 3 days
}

// User login
const loginUser = async(req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // Create token for user
    const token = createToken(user._id);

    // Return email and jwt
    res.status(200).json({email, token});
  }

  catch (error) {
    res.status(400).json({error: error.message});
  }
};

// Register user
const registerUser = async(req, res) => {
  const {email, password, name} = req.body;

  try {
    const user = await User.signup(email, password, name);

    // Create token for user
    const token = createToken(user._id);

    res.status(200).json({email, token});
  }

  catch (error) {
    res.status(400).json({error: error.message});
  }
};

module.exports = { loginUser, registerUser };
