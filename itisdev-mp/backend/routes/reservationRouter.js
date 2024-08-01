const express = require('express');
const { createReservation, getRoomDetails} = require('../controllers/reservationController');


const router = express.Router();

router.post('/', createReservation);

router.get('/:roomNumber', getRoomDetails);


module.exports = router;