const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
}); 


const feedbackSchema = new mongoose.Schema({
    reservationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reservation',
        required: true
    },
    questions: [questionSchema],
}, {timestamps: true});

module.exports = mongoose.model('Feedback', feedbackSchema, 'Feedback');