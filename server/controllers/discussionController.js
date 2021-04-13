const Discussion = require('../models/discussionModel');
const User = require('../models/user');
const Course = require('../models/course');
const Schools = require('../models/schools');
const mongoose = require('mongoose');
const { async } = require('node-ical');
const Schema = mongoose.Schema;
const Comments = require('../models/allComments');
var CourseContent = mongoose.model('CourseContent', new Schema(), 'CourseContent');

//function to get all the schools of the courses to filter by school 
const discussion_index=async(req,res)=>{
    try {
        const schoolList = [];
        const schools = await Schools.find({}, function(err) {
            if (err) { 
                console.log(err);
            }
        });
        res.status(200).send(schools);
    }
    catch {
        console.log(err);
        res.status(400).send(err); 
    }
};

//debug function to check comments 
const create_first_comment=async(req,res)=>{
    try {

        const com = new Comments({
            refID: 1,
            comments: []
        })
        com.save().then((result)=>{
            console.log(result);})
             .catch((err)=>{
                 console.log(err);});
        res.status(200).send(com);
    }
    catch {
        console.log(err);
        res.status(400).send(err); 
    }
};

//function to get top courses either by school or overall
const get_top_courses=async(req,res)=>{
    try {
        const school = req.body.school;
        if (school) {
            let top = await Discussion.find({school:school}).sort({overallRating: -1}).limit(5);
            res.status(200).send(top);
        }
        else {
            let top = await Discussion.find({}).sort({overallRating: -1}).limit(5);
            res.status(200).send(top);
        }
    }
    catch {
        console.log(err);
        res.status(400).send(err); 
    }
};

//function to get a specific course page
const course_page=async(req,res)=>{
    try{
        const courseCode = req.body.courseCode;
        console.log(courseCode);
        const Dis = await Discussion.findOne({courseCode:courseCode});
        if (Dis) res.status(200).send(Dis);
        else res.status(400).send("Page doesn't exist!");
    }
    catch (err){
        res.status(400).send(err);
    }
};

//function to add a reply to a comment
const add_reply=async(req,res)=>{

    try {
        const courseCode = req.body.courseCode;
        console.log(courseCode);

        let tempCourse = await Discussion.find({courseCode:courseCode});
        tempCourse=tempCourse[0];

        console.log(tempCourse);
        tempComment = tempCourse.comments.find(obj => obj.commentID == req.body.commentID);

        const replyID = Date.now();
        // console.log(tempComment);

        const reply ={
            studentID: req.body.studentID,
            replyID: replyID,
            replyBody: req.body.replyBody
        };

        console.log(reply)

        // await Comments.update(
        //     {
        //         refID: 1,
        //         "comments.commentID": req.body.commentID
        //     },
        //     {
        //         $push:{
        //             comments:{
        //                 "comments.$.replies": reply
        //             }
        //         }
        //     }
        // )

        await Discussion.update(
            {
                courseCode:req.body.courseCode,
                "comments.commentID": req.body.commentID
            },
            {
                $push:{
                    "comments.$.replies": reply
                }
            }
        );

        temp = await Discussion.findOne({courseCode:courseCode});
        // temp = await Comments.find({});
        res.status(200).send(temp);

    }
    catch (err){
        console.log(err);
        res.status(400).send(err);
    }
}

//function to add a rating and a comment to a course
const update_course_page=async(req,res)=>{
    try{
        const courseCode = req.body.courseCode;
        console.log(courseCode);

        let temp = await Discussion.find({courseCode:courseCode});
        temp=temp[0];
        
        const commentID = Date.now();

        console.log(temp.numReviews);
        const numRev = temp.numReviews + 1;
        let use = 0;
        let ease = 0;
        let time=0;

        if (temp.usefulness) {
            use = temp.usefulness;
            ease = temp.easiness;
            time = temp.timeInvestment;
        }

        const setUse = use + ((req.body.usefulness-use)/numRev);
        const setEase = ease + ((req.body.easiness-ease)/numRev);
        const setTime = time + ((req.body.timeInvestment-time)/numRev);
        const setOverall = (setUse+setEase+setTime)/3;
        

        const studentsRated = temp.studentsRated;
        let studentHasComment = false;

        for (i=0; i < studentsRated.length; i++) {
            if (req.body.studentsRated == studentsRated[i]) studentHasComment = true;
        }

        if (!studentHasComment) {
            // console.log(use, req.body.usefulness, (req.body.usefulness-use), temp.numReviews, (req.body.usefulness-use)/numRev);
            
            await Comments.updateOne(
                {refID: 1},
                {
                    $push:{
                        comments:{
                            studentID: req.body.studentID,
                            commentID:commentID,
                            commentBody:req.body.commentBody
                        }
                    }
                }
            )

            await Discussion.updateOne(
                {
                    courseCode:req.body.courseCode
                },
                {
                    $push:{
                        comments:{
                            studentID: req.body.studentID,
                            commentID: commentID, //CHANGE TO AUTO LATER
                            commentBody: req.body.commentBody                        },
                        studentsRated:req.body.studentsRated
                    },
                    $inc: {
                        numReviews:1
                    },
                    $set: {
                        usefulness: setUse,
                        easiness: setEase,
                        timeInvestment: setTime,
                        overallRating: setOverall
                    }
                }
            );
        }
        temp = await Discussion.findOne({courseCode:courseCode});
        // temp = await Comments.find({});

        res.status(200).send(temp);
    }
    catch (err){
        res.status(400).send(err);
    }
}

//backend function to add all courses to discussion forum database
const add_course_page=async(req, res)=>{
    // res.status(200).send('OK!');
    try {
        // res.status(200).send('Done adding courses!');
        console.log(-1);
        let courseList = await CourseContent.find({}, function(err) {
            if (err) { 
                console.log(err);
            }
        });

        console.log(100);
        let schoolList = []
        for (i=0; i < courseList.length; i++) {
            let temp = courseList[i].toJSON();
            let sch = temp.courseCode.slice(0,2);
            if (!schoolList.includes(sch)) schoolList.push(sch);

            console.log(temp)
            const Dis =new Discussion({
                courseCode: temp.courseCode,
                school: sch,
                courseInfo:temp.details
            });
            console.log(Dis)

            Dis.save().then((result)=>{
                console.log(result);})
                 .catch((err)=>{
                     console.log(err);});
        }

        const Sch = new Schools({
            schoolList: schoolList
        })
        Sch.save().then((result)=>{
            console.log(result);})
             .catch((err)=>{
                 console.log(err);});
        // res.status(200).send('Done adding courses!');
    }
    catch (err) {
        res.status(400).send(err);
    }
    
}

module.exports={
    discussion_index,
    course_page,
    get_top_courses,
    add_reply,
    update_course_page,
    add_course_page,
    CourseContent,
    create_first_comment
}