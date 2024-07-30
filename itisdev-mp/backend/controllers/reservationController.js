const Reservations = require('../models/ReservationModel'); 
const mongoose = require('mongoose');

// Posts a new reservation
const createReservation = async(req, res) => {
    try {                           
        const {roomTitle, roomType, checkIn, checkOut,days,pin} = req.body;
        const reservation = await Reservations.create({roomTitle, roomType, checkIn, checkOut,days,pin});
        res.status(201).json(reservation);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
};                          




module.exports = {
    createReservation
};