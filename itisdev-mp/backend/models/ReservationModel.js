const moongose = require('mongoose');

const reservationSchema = new moongose.Schema({
    roomTitle: {
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
    days: {
        type: Number,
        required: true
    }
}, {timestamps: true});

module.exports = moongose.model('Reservation', reservationSchema, 'Reservations');

