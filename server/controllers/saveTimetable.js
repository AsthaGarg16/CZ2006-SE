/**
 * Saves the timetable to the database and adds id to user's profile
 *
 * @author: Akshat
 */

/** Importing timetable and user entity */
const Timetable = require("../models/timetable");
const User = require("../models/user");

/**
 * User entity
 * @typedef {Object} user
 * @property {String} email
 * @property {String} name
 * @property {String} password
 * @property {String} courseOfStudy
 * @property {number} yearOfStudy
 */

/**
 * Timetable entity
 * @typedef {Object} timetable
 * @property {String} timetableID
 * @property {[{courseID:string, indexNum:string}]} courseSelected
 * @property {[[Date]]} fixedTimeSlots
 * @property {[{courseID:string, indexNum:string}]} courseFixed
 * @property {[string]} courseClashAllowed
 */


/** Main function for saving the timetable 
 * 
 * @param {string} req.body.email = User email
 * @param {string} req.body.timetableID = Timetable id
 * @param {[{courseID:string, indexNum:string}]} req.body.courseSelected = List of selecetd courses
 * @param {[{courseID:string, indexNum:string}]} req.body.courseFixed = List of courses with fixed indices
 * @param {[[Date]]} req.body.fixedTimeSlots = List of fixed time slots
 * @param {[string]} req.body.courseClashAllowed = List of courses which allow clash
 * @returns {string} success or error message
 */
const saveTimetable = async (req, res) => {
  const {
    userEmail,
    timetableID,
    courseSelected,
    courseFixed,
    fixedTimeSlots,
    courseClashAllowed,
  } = req.body;
  console.log(courseSelected);

  const timetable = new Timetable({
    timetableID: timetableID,
    courseSelected: courseSelected,
    fixedTimeSlots: fixedTimeSlots,
    courseFixed: courseFixed,
    courseClashAllowed: courseClashAllowed,
  });

  User.updateOne(
    {
      email: req.body.userEmail,
    },
    {
      $push: {
        timetables: req.body.timetableID,
      },
    },
    function (err, result) {
      if (result.nModified == 0) {
        //console.log("print")
        if (finalMessage) res.status(500).send("Update error in user");
        else finalMessage = false;
      } else {
        finalMessage = true;


        res.status(200).send("Success");
      }
    }
  );

  console.log(timetable);
  timetable
    .save()
    .then((timetable) => {
      console.log(timetable);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
};


/** Main function for getting the saved timetables
 * 
 * @param {string} req.body.timetableID = THe required timetable to be returned
 * @returns {(timetable|string)} the saved timetable or an error message
 */
const getsavedTimetable = async (req, res) => {
  try {
    const timetableID = req.body.timetableID;
    console.log(timetableID);

    const result = await Timetable.find({ timetableID: timetableID });
    console.log(result);
    res.status(200).send(result);
  } catch {
    res.status(400).send("err");
  }
};


/** Main function for removing a saved timetable 
 * 
 * @param {string} req.body.email = User email
 * @param {string} req.body.timetableID = the timetable id to be removed
 * @returns {string} success or error message
 */
const removeSavedTimetable = async (req, res) => {
  User.update(
    { email: req.body.userEmail },
    {
      $pull: {
        timetables: req.body.timetableID,
      },
    },
    function (err, result) {
      if (err) {
        return res.status(500).send("Error in removing Timetable");
      } else {
        return res.status(200).send("Successfully removed Timetable");
      }
    }
  );
};

/** exporting controller functions */
module.exports = { saveTimetable, getsavedTimetable, removeSavedTimetable };
