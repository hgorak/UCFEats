const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async(recipient) => {
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

    // Send mail
    const info = await transporter.sendMail({
      from: '"Fred Foo"' + process.env.EMAIL,
      to: recipient,
      subject: "Email Verification",
      text: "Hello??"
    });

    console.log("Message sent: %s", info.messageId);
  }

  catch (error) {console.error(error)}
};


module.exports = sendEmail;
