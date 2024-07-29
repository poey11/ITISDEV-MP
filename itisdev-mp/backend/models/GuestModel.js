const moongose = require('mongoose');

const guestSchema = new moongose.Schema({
    title:{
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    reservationId:{
        type: moongose.Schema.Types.ObjectId,
        ref: 'Reservation',
        required: true
    }

}, {timestamps: true});


guestSchema.pre('save', async function(next){
    const guest = this;
    if(guest.isModified('reservationId')){
        const Reservation = require('./ReservationModel');
        const reservation = await Reservation.findById(guest.reservationId);
        if(!reservation){
            throw new Error('Invalid Reservation ID');
        }
    }
    next();
});


module.exports = moongose.model('Guest', guestSchema, 'Guests');

