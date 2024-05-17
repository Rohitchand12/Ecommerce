const nodemailer = require('nodemailer');

const sendMail = async (options) => {
  // 1) create a transporter i.e like a service that sends emails
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  // 2) create email options
  const mailOptions = {
    from: "rohit343@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html
  };

  // 3) send email
  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
