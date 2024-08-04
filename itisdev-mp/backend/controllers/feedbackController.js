const feedback = require('../models/feedbackModel');


   
const recordFeedback = async (req, res) => {
    try {
        const { reservationid2, feedbackData } = req.body;
        console.log(reservationid2,feedbackData)
        /*
        // Validate reservationId
        if (!mongoose.Types.ObjectId.isValid(reservationid2)) {
            return res.status(400).json({ error: 'Invalid reservation ID' });
        }
       */
        // Create an array of feedback questions and answers based on the expected format
        const feedbackQuestions = [
            { question: 'How satisfied are you with our service?', answer: feedbackData.service },
            { question: 'How would you rate the cleanliness?', answer: feedbackData.cleanliness },
            { question: 'How likely are you to recommend us?', answer: feedbackData.recommendation }
        ];

        // Create a new feedback record
        const feedbackRecord = await feedback.create({ reservationid2, questions: feedbackQuestions });
        res.status(201).json(feedbackRecord);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = { recordFeedback };