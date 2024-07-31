import React from 'react';

const Feedback = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const feedbackData = {
      serviceRating: document.getElementById('serviceRating').value,
      employeeRating: document.getElementById('employeeRating').value,
    };
    console.log(feedbackData);
    // You can handle the feedback submission here, e.g., send it to the server
  };

  return (
    <div className='Feedback'>
      <h1 className="text-2xl text-center">Feedback</h1>
      <h1 className='text-center'><b> Your feedback is important to us. Please let us know about our service and employees. </b></h1>
      <div className="flex justify-center">
        <form className="w-1/2" onSubmit={handleSubmit}>
          <label name="feedbackQuestion" id= "feedbackQuestion">How was our service?</label>
          <select name="feedbackRating" id="feedbackRating" className="w-full bg-gray-300 pl-1 mb-4">
            <option value="Happy">Happy</option>
            <option value="Moderate">Moderate</option>
            <option value="Sad">Sad</option>
          </select>
          
          <label name="feedbackQuestion" id= "feedbackQuestion">How was our employees?</label>
          <select name="feedbackRating" id="feedbackRating" className="w-full bg-gray-300 pl-1 mb-4">
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
