const mongoose = require('mongoose');
const Reservation = require('./ReservationModel'); // import reservation

const checkInSchema = new mongoose.Schema({
    reservationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reservation',
        required: true
    },
    guestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guest',
        required: true
    },
    checkInTime: {
        type: Date,
        default: Date.now,
        required: true
    },
    roomNumber: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Pre-save middleware to populate roomNumber from Reservation
checkInSchema.pre('save', async function(next) {
    if (this.isModified('reservationId')) {
        try {
            const reservation = await Reservation.findById(this.reservationId);
            if (reservation) {
                this.roomNumber = reservation.roomNumber;
            }
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

module.exports = mongoose.model('CheckIn', checkInSchema, 'CheckIns');
