const express = require('express');
const { createReservation, getAllReservations, 
    getSpecificReservation, deleteReservation, updateReservation} = require('../controllers/reservationController');


const router = express.Router();

// calls the getAllReservations function from the reservationController.js
router.get('/', getAllReservations ); 

// calls the getSpecificReservation function from the reservationController.js
router.get('/:id', getSpecificReservation);

// calls the createReservation function from the reservationController.js
router.post('/', createReservation);

// calls the deleteReservation function from the reservationController.js
router.delete('/:id', deleteReservation);   

//calls the updateReservation function from the reservationController.js
router.patch('/:id', updateReservation);

module.exports = router;