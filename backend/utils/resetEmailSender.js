const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const User = require('../models/userModel');

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '1h' });
}

const sendResetEmail = async (recipient) => {
  try
  {
    // Create Transporter
    const transporter = nodemailer.createTransport({
      host: "mail.privateemail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
      }
    });

    // Create token
    const token = createToken(recipient._id);

    // Set token to user
    await User.findByIdAndUpdate(recipient._id, {$set: {reset_token: token}});

    // Create html and link for resetting password
    const htmlReset = "Please Click Here To Reset Your Password";
    const link = 'https://ucf-eats.vercel.app/auth/reset/' + token; 

    // Send reset password email
    const info = await transporter.sendMail({
      from: '"UCFEats"' + process.env.EMAIL,
      to: recipient,
      subject: "Password Reset",
      html: '<a href=\"' + link + '\">' + htmlReset + '</a><br><br><span>Ignore This Email If You Did Not Request A New Password</span>'
    });

    console.log("Message sent: %s", info.messageId);
  }

  catch (error) {console.error(error)}
};


module.exports = sendResetEmail;
