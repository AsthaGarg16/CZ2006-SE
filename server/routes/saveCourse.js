//importing modules
const express=require('express');

//importing controllers
const saveCourses=require('../controllers/saveCourses');

//express router
const router=express.Router();

//routing
router.post('/saveCourses', saveCourses.saveCourses);
router.patch('/removeSavedCourses',saveCourses.removeSavedCourses);
//exporting router
module.exports=router;