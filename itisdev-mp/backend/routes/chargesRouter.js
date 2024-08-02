const express = require('express');
const router = express.Router();
const { getGuestCharges, createGuestCharge } = require('../controllers/chargesController');

router.get('/:reservationId', getGuestCharges);

router.post('/', createGuestCharge);

module.exports = router;