import nodemailer from "nodemailer";
import ejs from "ejs";
import { convert } from "html-to-text";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

export class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = process.env.EMAIL_FROM;
  }

  newTransport() {
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV == "production ") {
      console.log("creating a transport in production")
      return nodemailer.createTransport({
        host: process.env.PROD_EMAIL_HOST,
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.PROD_EMAIL_USER,
          pass: process.env.PROD_EMAIL_APIKEY,
        },
      });
    }
    else{
      console.log("still in development?");
      return nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        },
      });
    }
  }

  async send(template, subject) {
    //First render the ejs template
    const html = await ejs.renderFile(`${__dirname}/../views/${template}`, {
      name: this.firstName,
    });
    //define email options
    const mailOptions = {
      from: `Ecommerce.io <${this.from}>`,
      to: this.to,
      subject: subject,
      html,
      text: convert(html),
    };

    console.log("sending mail");
    //create transport and send the mail
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("welcome.ejs", "welcome to the Ecommerce app");
  }

  async sendResetPasswordLink(){
    await this.send("resetPassword.ejs","Your reset password link(valid for 10 min)")
  }
}

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

export default sendMail;
