const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    roomTitle: {
        type: String,
        required: true
    },
    roomType: {
        type: String,
        required: true
    },
    roomNumber: {
        type: String,
        required: true
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    days: {
        type: Number,
        required: true
    },
    pin: {
        type: String,
        required: true
    },
    checkInTime: {  
        type: Date
    },
    checkOutTime: {
        type: Date
    },
}, {timestamps: true});

module.exports = mongoose.model('Reservation', reservationSchema, 'Reservations');
