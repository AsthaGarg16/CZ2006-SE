//importing modules
const express = require("express");

//importing controllers
const plannner = require("../controllers/plannner");

//express router
const router = express.Router();
//routing
// route called in the beginning after login for basic student details
router.post("/send_timetable", plannner.send_timetable);

module.exports = router;
