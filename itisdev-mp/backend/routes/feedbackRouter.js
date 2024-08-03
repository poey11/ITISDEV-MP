const express = require('express');
const {recordFeedback} = require('../controllers/feedbackController');

const router = express.Router();

router.post('/', recordFeedback);

module.exports = router;