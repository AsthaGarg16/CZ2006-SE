
const Course = require('../models/courseContent');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const getCourseList = async(req,res)=>{
    try{
        //console.log("entering");
        const allCourses = await Course.find({},function(err){
            //console.log("course");
            if(err){
                console.log(err);
            }
            
        });
        
        res.status(201).send(allCourses);
        // var cList=await getCourses(allCourses);
        var courseList =[];
        // for(i=0;i<allCourses.length;i++)
        // {
        //     var course=[];
        //     course.push(allCourses[i]["details"][0][0]);
        //     course.push(allCourses[i]["details"][0][1]);
        //     courseList.push(course);
        // }
        // return courseList;
        // res.status(201).send(courseList);
        
}
    catch{
        res.status(400).send("error");
    }
}

// function getCourses(allCourses)
// {
//     var courseList =[];
//     for(i=0;i<allCourses.length;i++)
//     {
//         var course=[];
//         course.push(allCourses[i]["details"][0][0]);
//         course.push(allCourses[i]["details"][0][1]);
//         courseList.push(course);
//         console.log(course);
//     }
//     return courseList;
    
// }


module.exports = getCourseList;


