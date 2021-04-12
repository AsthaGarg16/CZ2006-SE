const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reply = new Schema({
    studentID:{
        type: String,
        required: true
    },
    replyID: {
        type: Number,
        required: true
    },
    replyBody: {
        type:String,
        require:true
    }
});

//definining the schema of a comment
const comment = new Schema({
    studentID:{
        type: String,
        required: true
    },
    commentID: {
        type: Number,
        required: true
    },
    commentBody: {
        type: String,
        required: true
    },
    replies:[reply]
});

const allComments = new Schema({
    refID: {
        type: Number,
        default: 1
    },
    comments: [comment]
})

//making the mongoose model and exporting it
const Comments= mongoose.model('comments', allComments, 'Comments');
module.exports= Comments;