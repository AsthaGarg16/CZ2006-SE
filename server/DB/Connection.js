/**
 * Connecting to the MongoDB database
 *
 * @author: Astha and Akshat
 */
const mongoose = require('mongoose');
const dotenv = require ('dotenv');
dotenv.config();

const connectDB = async () => {
    await mongoose.connect(process.env.URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
    .then((result) =>console.log('db connected..!'))
    //.except((err) => console.log(err));
  };
  
  module.exports = connectDB;