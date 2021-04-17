/**
 * Saves the course selected by the user to the database in user's profile
 *
 * @author: Akshat
 */

/** Importing savedCourse entity */
const savedCourse = require("../models/savedCourse");

/**
 * Saved course entity
 * @typedef {Object} savedCourse
 * @property {String} email = user's email id
 * @property {[String]} savedCourse = list of course codes saved by the user
 */



/** Main function for saving the course 
 * 
 * @param {string} req.body.email = User email
 * @param {[string]} req.body.savedCourses = User;s current saved courses list
 * @returns {{message: string}} success or error message
 */
const saveCourses = async (req, res) => {
  const { email, savedCourses } = req.body;
  try {
    const oldUser = await savedCourse.findOne({ email });

    if (oldUser) {
      const filter = { email: email };
      const updatePass = {
        $push: {
          savedCourse: savedCourses,
        },
      };
      const result = await savedCourse.updateOne(filter, updatePass);
      console.log("document updated");

      return res.status(200).json({ message: "saved Courses updated" });
    } else {
      const result = await savedCourse.create({
        email,
        savedCourse: savedCourses,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};


/** Main function for getting the saved the courses
 * 
 * @param {string} req.body.email = User email
 * @returns {(savedCourse|string)} list of saved courses or an error message
 */
const getSavedCourses = async (req, res) => {
  try {
    const email = req.body.email;

    const result = await savedCourse.find({ email: email });
    console.log(result);
    res.status(200).send(result);
  } catch {
    res.status(400).send("err");
  }
};




/** Main function for removing a saved course 
 * 
 * @param {string} req.body.email = User email
 * @param {[string]} req.body.savedCourse = User;s current saved courses list
 * @returns {string} success or error message
 */
const removeSavedCourses = async (req, res) => {
  savedCourse.update(
    { email: req.body.userEmail },
    {
      $pull: {
        savedCourse: req.body.savedCourse,
      },
    },
    function (err, result) {
      if (err) {
        return res.status(500).send("Update error in user");
      } else {
        return res.status(200).send("Successfully removed course");
      }
    }
  );
};


/** exporting controller functions */
module.exports = {
  saveCourses,
  getSavedCourses,
  removeSavedCourses,
};
