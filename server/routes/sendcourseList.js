const express = require('express');

const courseList = require('../controllers/courseList');

const router = express.Router();

router.get('/getCourseList', courseList);

module.exports = router;