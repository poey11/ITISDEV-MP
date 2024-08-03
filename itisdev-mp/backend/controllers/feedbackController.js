const feedback = require('../models/feedbackModel');

const recordFeedback = async(req, res) => {
    try {
        const {reservationId, feedbackData } = req.body;
        
        console.log(reservationId, feedbackData);
        const feedbackRecord = await feedback.create({reservationId,questions:feedbackData});
        res.status(201).json(feedbackRecord);
    } catch (error) {
        res.status(400).json({error: error.message});
    }

}

module.exports = { recordFeedback };