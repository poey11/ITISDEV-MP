const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const chargesSchema = new mongoose.Schema({
    reservationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reservation',
        required: true
    },
    itemsList: [itemSchema]
}, {timestamps: true});

module.exports = mongoose.model('Charges', chargesSchema, 'Charges');
