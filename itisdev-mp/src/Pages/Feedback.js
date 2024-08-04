import React from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import NavBar from '../Components/NewNavBar';
import Footer from '../Components/Footer';

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
 
  };

  return (
    /* Derick mahihirapan ka ata dito, pag ako sayu papalitan mo lahat tas gagawin mo  ung parang ginawa ko sa main. di kinaya iconvert lahat ng ginawa nilang frontend to react */
      <body class="text-gray-300 min-h-screen flex flex-col justify-between">
        <NavBar />
        <main class="flex-grow flex flex-col items-center justify-center text-center">
            <div class="container relative flex flex-col items-center justify-center text-center p-8">
                <h2 class="text-4xl font-bold mb-4 text-white">We Value Your Feedback</h2>
                <form id="feedback-form" class="w-full max-w-3xl bg-white text-black rounded shadow-lg p-8 space-y-4">
                    <div>
                        <p class="text-lg mb-2">How satisfied are you with our service?</p>
                        <div class="flex justify-center space-x-4">
                            <label class="icon-wrapper">
                                <input type="radio" name="service" value="not-satisfied" class="icon-input hidden" />
                                <span class="icon-label">
                                    <img src="../images/unfilled-sad.png" data-filled="/itisdev/images/filled-sad.png" data-unfilled="/itisdev/images/unfilled-sad.png" alt="Not Satisfied" />
                                </span>
                                <span class="icon-description">Not Satisfied</span>
                            </label>
                            <label class="icon-wrapper">
                                <input type="radio" name="service" value="moderately-satisfied" class="icon-input hidden" />
                                <span class="icon-label">
                                    <img src="../images/unfilled-neutral.png" data-filled="/itisdev/images/filled-neutral.png" data-unfilled="/itisdev/images/unfilled-neutral.png" alt="Moderately Satisfied" />
                                </span>
                                <span class="icon-description">Moderately Satisfied</span>
                            </label>
                            <label class="icon-wrapper">
                                <input type="radio" name="service" value="extremely-satisfied" class="icon-input hidden" />
                                <span class="icon-label">
                                    <img src="../images/unfilled-happy.png" data-filled="/itisdev/images/filled-happy.png" data-unfilled="/itisdev/images/unfilled-happy.png" alt="Extremely Satisfied" />
                                </span>
                                <span class="icon-description">Extremely Satisfied</span>
                            </label>
                        </div>
                    </div>
                    
                    <div>
                        <p class="text-lg mb-2">How would you rate the cleanliness?</p>
                        <div class="flex justify-center space-x-4">
                            <label class="icon-wrapper">
                                <input type="radio" name="cleanliness" value="not-satisfied" class="icon-input hidden" />
                                <span class="icon-label">
                                    <img src="../images/unfilled-sad.png" data-filled="/itisdev/images/filled-sad.png" data-unfilled="/itisdev/images/unfilled-sad.png" alt="Not Satisfied" />
                                </span>
                                <span class="icon-description">Not Satisfied</span>
                            </label>
                            <label class="icon-wrapper">
                                <input type="radio" name="cleanliness" value="moderately-satisfied" class="icon-input hidden" />
                                <span class="icon-label">
                                    <img src="../images/unfilled-neutral.png" data-filled="/itisdev/images/filled-neutral.png" data-unfilled="/itisdev/images/unfilled-neutral.png" alt="Moderately Satisfied" />
                                </span>
                                <span class="icon-description">Moderately Satisfied</span>
                            </label>
                            <label class="icon-wrapper">
                                <input type="radio" name="cleanliness" value="extremely-satisfied" class="icon-input hidden" />
                                <span class="icon-label">
                                    <img src="../images//unfilled-happy.png" data-filled="/itisdev/images/filled-happy.png" data-unfilled="/itisdev/images/unfilled-happy.png" alt="Extremely Satisfied" />
                                </span>
                                <span class="icon-description">Extremely Satisfied</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <p class="text-lg mb-2">How likely are you to recommend us?</p>
                        <div class="flex justify-center space-x-4">
                            <label class="icon-wrapper">
                                <input type="radio" name="recommendation" value="not-satisfied" class="icon-input hidden" />
                                <span class="icon-label">
                                    <img src="/../images/unfilled-sad.png" data-filled="/itisdev/images/filled-sad.png" data-unfilled="/itisdev/images/unfilled-sad.png" alt="Not Satisfied" />
                                </span>
                                <span class="icon-description">Not Satisfied</span>
                            </label>
                            <label class="icon-wrapper">
                                <input type="radio" name="recommendation" value="moderately-satisfied" class="icon-input hidden" />
                                <span class="icon-label">
                                    <img src="../images/unfilled-neutral.png" data-filled="/itisdev/images/filled-neutral.png" data-unfilled="/itisdev/images/unfilled-neutral.png" alt="Moderately Satisfied" />
                                </span>
                                <span class="icon-description">Moderately Satisfied</span>
                            </label>
                            <label class="icon-wrapper">
                                <input type="radio" name="recommendation" value="extremely-satisfied" class="icon-input hidden" />
                                <span class="icon-label">
                                    <img src="../images/unfilled-happy.png" data-filled="/itisdev/images/filled-happy.png" data-unfilled="/itisdev/images/unfilled-happy.png" alt="Extremely Satisfied" />
                                </span>
                                <span class="icon-description">Extremely Satisfied</span>
                            </label>
                        </div>
                    </div>

                    <button id="submit-feedback-btn" type="submit" class="bg-[#994a1d] text-white font-bold py-2 px-4 rounded hover:bg-[#C87941]">Submit</button>
                    <button id="submit-feedback-btn" type="submit" class="bg-[#994a1d] text-white font-bold py-2 px-4 rounded hover:bg-[#C87941] ml-5">Skip</button>

                </form>
            </div>
        </main>
        <Footer />
      </body>
  );
};

export default Feedback;
