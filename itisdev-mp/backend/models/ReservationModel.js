const moongose = require('mongoose');

const reservationSchema = new moongose.Schema({
    reservedUnderName: {
        type: String,
        required: true
    },
    roomType: {
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
    NoOfAdults: {
        type: Number,
        required: true
    },
    NoOfChildren: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    }

}, {timestamps: true});

module.exports = moongose.model('Reservation', reservationSchema, 'Reservations');

