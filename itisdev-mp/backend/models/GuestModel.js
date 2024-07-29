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




module.exports = moongose.model('Guest', guestSchema, 'Guests');

