/**
 * Creates new user account with the input information
 *
 * @author: Astha
 */

/** Importing necessary libraries */
const bcrypt=require("bcryptjs") ;
const jwt =require("jsonwebtoken");
const dotenv = require("dotenv");
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



/** Main function for registering a new user
 * 
 * @param {string} req.body.email = User email
 * @param {string} req.body.name = User name
 * @param {string} req.body.password = User password
 * @param {string} req.body.courseOfStudy = User course of study
 * @param {number} req.body.yearOfStudy = User year of study
 * @returns {user} user entity
 */
const register = async (req, res) => {
    const { email,name, password,  courseOfStudy, yearOfStudy } = req.body;
  
    try {
      const oldUser = await UserModal.findOne({ email });
  
      if (oldUser) return res.status(400).json({ message: "User already exists" });
  
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const result = await UserModal.create({ email, password: hashedPassword, name, courseOfStudy, yearOfStudy});
  
      const token = jwt.sign( { email: result.email, id: result._id }, process.env.SECRET);
  
      res.status(201).json({ result, token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      
      console.log(error);
    }
  };
/** exporting main controller function */
  module.exports = register;