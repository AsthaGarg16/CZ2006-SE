//importing modules
const express = require("express");

//importing controllers
const saveCourses = require("../controllers/saveCourses");

//express router
const router = express.Router();

//routing
router.put("/saveCourses", saveCourses.saveCourses);
router.patch("/removeSavedCourses", saveCourses.removeSavedCourses);
router.post("/getSavedCourses", saveCourses.getSavedCourses);
//exporting router
module.exports = router;
