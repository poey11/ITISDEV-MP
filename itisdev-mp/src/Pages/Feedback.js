import React from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';


const Feedback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const {reservationId } = state || {};


  const handleSubmit = async (e) => {
    e.preventDefault();
    const feedbackData = [
      {question: 'How was our service?', answer: e.target.feedbackRatingA.value},
      {question: 'How was our employees?', answer: e.target.feedbackRatingB.value}
    ]

  
    const feedbackResponse = await fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({reservationId,  feedbackData})
    });

    const feedbackResult = await feedbackResponse.json();
    if(!feedbackResponse.ok) {
      console.error('Error submitting feedback:', feedbackResult);
      return;
    }
    alert('Feedback submitted!!');
    navigate('/');
 
    // You can handle the feedback submission here, e.g., send it to the server
  };

  return (
    <div className='Feedback'>
      <h1 className="text-2xl text-center">Feedback</h1>
      <h1 className='text-center'><b> Your feedback is important to us. Please let us know about our service and employees. </b></h1>
      <div className="flex justify-center">
        <form className="w-1/2" onSubmit={handleSubmit}>
          <label name="feedbackQuestion" id= "feedbackQuestion">How was our service?</label>
          <select name="feedbackRating" id="feedbackRatingA" className="w-full bg-gray-300 pl-1 mb-4">
            <option value="Happy">Happy</option>
            <option value="Moderate">Moderate</option>
            <option value="Sad">Sad</option>
          </select>
          
          <label name="feedbackQuestion" id= "feedbackQuestion">How was our employees?</label>
          <select name="feedbackRating" id="feedbackRatingB" className="w-full bg-gray-300 pl-1 mb-4">
            <option value="Happy">Happy</option>
            <option value="Moderate">Moderate</option>
            <option value="Sad">Sad</option>
          </select>
         
          
          <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">Submit Feedback</button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
