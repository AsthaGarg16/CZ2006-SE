/**
 * Sends verification code and updates user password in the database
 *
 * @author: Astha
 */

/** Importing necessary libraries */
const bcrypt = require("bcryptjs");
const UserModal = require("../models/user");
var nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();

/** Sends email with the verification code
 * 
 * @param {string} req.body.email = user's email
 * @returns {({message:string , code:string} | {message:string })} the verification code and success message or error message
 */
const sendEmail = async (req, res) => {

  console.log(req.body);
  const { userEmail } = req.body.email;
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.HOST_EMAIL,
      pass: process.env.HOST_PASSWORD,
    },
  });
  let r = Math.random().toString(36).substring(7);
  console.log(r);
  var mailOptions = {
    from: process.env.HOST_EMAIL,
    to: userEmail,
    subject: "MyCal Forgot Password Code",
    text:
      "Please use the following code to reset your password for your MyCal account: " +
      r,
  };


  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    } else {
      console.log("Email sent: " + info.response);
      return res.status(200).json({ message: "Email sent!", code: r });
    }
  });
};


/** Updates password in the database
 * 
 * @param {string} req.body.email = user's email
 * @param {string} req.body.password = user's new password
 * @returns {{message:string}} Success or error message
 */
const forgotPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) {
      const filter = { email: email };
      const hashedPassword = await bcrypt.hash(password, 12);
      const updatePass = {
        $set: {
          password: hashedPassword,
        },
      };
      const result = await UserModal.updateOne(filter, updatePass);
      console.log(
        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
      );

      return res.status(200).json({ message: "Password updated" });
    } else {
      res.status(500).json({ message: "User does not exist" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};


/** Exporting send email and forgot password functions */
module.exports = { sendEmail, forgotPassword };
