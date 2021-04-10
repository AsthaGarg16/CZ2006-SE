const express = require('express');
const sharingController = require('../controllers/sharingController');

const router = express.Router();

router.get('/', sharingController.timetable_index);

router.get('/link', sharingController.link_share);

// router.get('/QR', sharingController.share_QR);

router.get('/export', sharingController.export_settings);

router.get('/getCourses', sharingController.all_courses);

router.get('/ics', sharingController.download_ics);

router.post('/addTimetable', sharingController.add_timetable);


module.exports = router;