const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseContentSchema = new Schema({
    courseCode:{
        type: String,
    },
    details:{
        type: [[String]]
    }

})

//making the mongoose model and exporting it
const courseContent= mongoose.model('courseContent', courseContentSchema, 'CourseContent');
module.exports= courseContent;