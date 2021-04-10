//importing modules
const express = require("express");

//importing controllers
const Appointment = require("../controllers/IcsToAppointConverter");

//express router
const router = express.Router();

//routing
router.post("/get_appointments", Appointment.return_appointments);

module.exports = router;
