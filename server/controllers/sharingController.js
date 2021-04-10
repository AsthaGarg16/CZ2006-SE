const Timetable = require('../models/timetable');
const User = require('../models/user');
const QRCode = require('qrcode');
const { Schema } = require('mongoose');
const createICS = require('./icsConversion');
const dis = require('./discussionController');
var CourseContent = dis.CourseContent;


const timetable_index=async(req,res)=>{
    try {
        console.log(req);
        const email = req.body.email;
        user = await User.findOne({email:email});
        res.status(200).send(user.timetables);
    }
    catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
};

const all_courses=async(req,res)=>{
    try {
        courses = await CourseContent.find({});
        courseList = []
        for (i=0; i < courses.length; i++) {
            let temp = courses[i].toJSON()
            temp = temp.details
            // console.log("FIRST", temp);
            temp = temp.slice(0,1)
            // console.log("SECOND", temp);
            temp = temp[0]
            // console.log("THIRD", temp);
            temp = temp.slice(0,2)
            // console.log("FOURTH", temp);
            console.log(temp);
            courseList.push(temp);
        }
        res.status(200).send(courseList);
    }
    catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
};

const add_timetable=async(req,res)=>{
    try{
        const email = req.body.email;
        const timetableID = req.body.timetableID;
        const courseID = req.body.courseID;
        const indexNum = req.body.indexNum;
        const fixedTimeSlots = req.body.fixedTimeSlots;
        const courseClashAllowed = req.body.courseClashAllowed;
        console.log(courseClashAllowed);
        const course = {
            courseID: courseID,
            indexNum: indexNum
        }
        const timetable = new Timetable({
            timetableID:timetableID,
            courseSelected:[course],
            fixedTimeSlots: fixedTimeSlots,
            courseFixed: [course],
            courseClashAllowed: courseClashAllowed
        });

        timetable.save().then((result)=>{
            console.log(result);})
             .catch((err)=>{
                 console.log(err);});

        await User.updateOne(
            {
                email:email
            },
            {
                $push:{                  
                    timetables:timetableID
                }
            }
        );

        res.status(200).send("Added timetable");

    }
    catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
}

const link_share=async(req,res)=>{
    try {
        const timetableID = req.body.timetableID;
        const timetable = await Timetable.findOne({timetableID:timetableID});
        const link = encodeURIComponent(JSON.stringify(timetable));
        res.status(200).send(req.protocol + '://' + req.get('host') + '/' + link);
    }
    catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
};

// const share_QR=async(req, res) => {
//     try {
//         // const link = link_share(req, res);
//         const link = "https://www.google.com";
//         const QR = QRCode.toDataURL(link, function (err, url) {
//             console.log(url)
//         });
//         return QR;
//     }
//     catch (err) {
//         res.status(400).send(err);
//         console.log(err);
//     }
// }

const export_settings=async(req,res)=>{
    try {
        const timetableID = req.body.timetableID;
        const timetable = await Timetable.findOne({timetableID:timetableID});
        res.status(200).send(timetable);
    }
    catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
};

const download_ics=(req,res)=>{
    const ics = createICS.createICS(req.body.appointments);
    res.status(200).send(ics);
};

//exporting the functions
module.exports={
    timetable_index,
    link_share,
    // share_QR,
    export_settings,
    download_ics,
    add_timetable,
    all_courses
};
