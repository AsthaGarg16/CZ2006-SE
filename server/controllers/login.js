/**
 * Validates user inputs and creates a login token 
 *
 * @author: Astha
 */

/** Importing necessary libraries */
const bcrypt=require("bcryptjs") ;
const jwt =require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

/** Importing user entity */
const UserModal= require("../models/user.js");


/**
 * User entity
 * @typedef {Object} user
 * @property {String} email
 * @property {String} name
 * @property {String} password
 * @property {String} courseOfStudy
 * @property {number} yearOfStudy
 */



/** Main function for logging in an existing user
 * 
 * @param {string} req.body.email = User email
 * @param {string} req.body.password = User password
 * @returns {user} user entity and token
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, process.env.SECRET);

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

/** exporting main controller function */
module.exports = login;
