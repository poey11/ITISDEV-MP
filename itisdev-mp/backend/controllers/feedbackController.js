const feedback = require('../models/feedbackModel');


   
const recordFeedback = async (req, res) => {
    try {
        const { reservationId, feedbackData } = req.body;
         
      // Create an array of feedback questions and answers based on the expected format
        const feedbackQuestions = [
            { question: 'How satisfied are you with our service?', answer: feedbackData.service },
            { question: 'How would you rate the cleanliness?', answer: feedbackData.cleanliness },
            { question: 'How likely are you to recommend us?', answer: feedbackData.recommendation }
        ];

        // Create a new feedback record
        const feedbackRecord = await feedback.create({ reservationId, questions: feedbackQuestions });
        res.status(201).json(feedbackRecord);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = { recordFeedback };