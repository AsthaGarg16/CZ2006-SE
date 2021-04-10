const express = require('express');
const sharingController = require('../controllers/discussionController');

const router = express.Router();

router.get('/get_schools', sharingController.discussion_index);

router.get('/course', sharingController.course_page);

router.get('/top_course', sharingController.get_top_courses);

router.post('/comment', sharingController.update_course_page);

router.post('/reply', sharingController.add_reply);

router.post('/add', sharingController.add_course_page);

module.exports=router;