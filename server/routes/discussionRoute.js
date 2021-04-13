const express = require("express");
const sharingController = require("../controllers/discussionController");
const cList = require("../controllers/courseList");

const router = express.Router();

router.get("/getCourseList", cList);

router.get("/get_schools", sharingController.discussion_index);

router.post("/course", sharingController.course_page);

router.post("/top_course", sharingController.get_top_courses);

router.post("/comment", sharingController.update_course_page);

router.post("/reply", sharingController.add_reply);

router.post("/add", sharingController.add_course_page);

router.post("/tempComment", sharingController.create_first_comment);

module.exports = router;
