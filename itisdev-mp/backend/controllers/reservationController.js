const Reservations = require('../models/ReservationModel'); 
const mongoose = require('mongoose');

// Gets all reservations
const getAllReservations = async(req, res) => {
    try {
        const reservations = await Reservations.find({}).sort({createdAt: -1});
        res.status(200).json(reservations);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
};

// Gets a specific reservation
const getSpecificReservation = async(req, res) => { 
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error: 'Reservation not found'});
    try {
        const reservation = await Reservations.findById(id);
        if(!reservation) {
            return res.status(404).json({error: 'Reservation not found'}); 
        }  
        res.status(200).json(reservation);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
};

// Posts a new reservation
const createReservation = async(req, res) => {
    const {reservedUnderName, roomType, checkIn, checkOut, NoOfAdults, NoOfChildren, paymentMethod} = req.body;
    try {
        const reservation = Reservations.create({reservedUnderName, roomType, checkIn, checkOut, NoOfAdults, NoOfChildren, paymentMethod});
        res.status(201).json(reservation);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
};


// deletes a specific reservation
const deleteReservation = async(req, res) => { 
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error: 'Reservation not found'});
    try {
        const reservation = await Reservations.findByIdAndDelete(id);
        if(!reservation) {
            return res.status(404).json({error: 'Reservation not found'}); 
        }  
        res.status(200).json(reservation);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
};

// updates a specific reservation
const updateReservation = async(req, res) => {
    const { id } = req.params;
   if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error: 'Reservation not found'});
    try {
        const reservation = await Reservations.findByIdAndUpdate(id, {
            ...req.body
        }, {new: true});
        res.status(200).json(reservation);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
};

module.exports = {
    getAllReservations,
    getSpecificReservation,
    createReservation,
    deleteReservation,
    updateReservation
};