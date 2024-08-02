const express = require('express');
const router = express.Router();
const { checkInGuest, checkOutGuest } = require('../controllers/checkController');

router.post('/', checkInGuest);

router.post('/checkout', checkOutGuest);

module.exports = router;
