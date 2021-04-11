const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const course = new Schema({
    courseID: {
        type:String,
        unique: false
    },
    indexNum: {
        type:Number,
        unique: false
    }
    
}, {_id:false});

//defining the schema of timetable
const timetableSchema = new Schema({
    timetableID:{
        unique: true,
        type: String,
        index: true,
        required: true,
        min:1
    },
    courseSelected:{
        type: [course],
        required: true,
        unique: false,
        _id:false

    },
    // each integer encodes a time slot
    fixedTimeSlots:{
        type: [[Date]],
        min: 11
    },
    courseFixed:{
        type: [course],
        unique: false,
        required:false,
        _id:false
    },
    courseClashAllowed:{
        type: [String]
    },
});

//making the mongoose model and exporting it
const Timetable= mongoose.model('Timetable', timetableSchema);
module.exports=Timetable;
