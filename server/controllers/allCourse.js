const Course = require("../models/course");
//const Course = db.Course;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const CourseContent = require('../models/courseContent');
var blah = mongoose.model("blah", new Schema(), "2020_2_courseTimes");
const getAllCourses = async (req, res) => {
  try {
    const allCourses = await blah.find({}, function (err) {
      if (err) {
        console.log(err);
      }
    });

    console.log(allCourses);
    res.status(200).send(allCourses);
  } catch {
    res.status(400).send(err);
  }
};

module.exports = getAllCourses;
