//importing modules
const express=require('express');

//importing controllers
const icsConverter = require('../controllers/AppointToIcsConverter');

//express router
const router=express.Router();

//routing
router.post('/get_ics_string', icsConverter.createICS);

module.exports=router;
