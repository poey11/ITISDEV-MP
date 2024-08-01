const express = require('express');
const router = express.Router();
const { checkInGuest } = require('../controllers/checkInController');

router.post('/', checkInGuest);

module.exports = router;
