const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const User = require('../models/userModel');

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '1d' });
}

const sendVerificationEmail = async (recipient) => {
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

    const token = createToken(recipient._id);

    await User.findByIdAndUpdate(recipient._id, {$set: {verification_token: token}});

    // Create html and link for email verification
    const htmlVerification = "Please Click Here To Verify Your Email";
    const link = 'https://ucf-eats.vercel.app/auth/verification/' + token; 

    // Send verification email
    const info = await transporter.sendMail({
      from: '"UCFEats"' + process.env.EMAIL,
      to: recipient.email,
      subject: "Email Verification",
      html: '<a href=\"' + link + '\">' + htmlVerification + '</a>'
    });

    console.log("Message sent: %s", info.messageId);
  }

  catch (error) {console.error(error)}
};


module.exports = sendVerificationEmail;
