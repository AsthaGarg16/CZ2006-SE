//importing modules
const express = require("express");

//importing controllers
const saveTimetable = require("../controllers/saveTimetable");

//express router
const router = express.Router();

//routing
router.put("/saveTimetable", saveTimetable.saveTimetable);
router.post("/getSavedTimetable", saveTimetable.getsavedTimetable);
router.patch("/removeSavedTimetable", saveTimetable.removeSavedTimetable);

//exporting router
module.exports = router;
