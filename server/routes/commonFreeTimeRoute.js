//importing modules
const express=require('express');

//importing controllers
const CommonFreeTime = require('../controllers/CommonFreeTimeFinder');

//express router
const router=express.Router();

//routing
router.post('/get_commonFreeTime', CommonFreeTime.return_freeTime);

module.exports=router;
