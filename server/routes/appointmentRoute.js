//importing modules
const express=require('express');

//importing controllers
const Appointment = require('../controllers/icsToAppointments');

//express router
const router=express.Router();

//routing
router.get('/get_appointments', Appointment.return_appointments);

module.exports=router;