import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NavBar from '../Components/NewNavBar';
import Footer from '../Components/Footer';

const Feedback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { reservationId } = state || {};
 // const reservationId = '66af845ada9ec1e3f8714867';

  // State to track selected values
  const [service, setService] = useState('');
  const [cleanliness, setCleanliness] = useState('');
  const [recommendation, setRecommendation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const feedbackData = {
      service,
      cleanliness,
      recommendation
    };

   
    try {
      const feedbackResponse = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reservationId, feedbackData })
      });

      if (!feedbackResponse.ok) {
        throw new Error('Error submitting feedback');
      }

      console.log(feedbackResponse)
      alert('Feedback submitted!');
      navigate('/');
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  // Function to render images based on the question type and selected value
  const renderImage = (questionType, optionValue, selectedValue) => {
    const imageNames = {
      'service': {
        'not-satisfied': 'sad',
        'moderately-satisfied': 'neutral',
        'extremely-satisfied': 'happy'
      },
      'cleanliness': {
        'not-satisfied': 'neutral',
        'moderately-satisfied': 'neutral',
        'extremely-satisfied': 'happy'
      },
      'recommendation': {
        'not-satisfied': 'sad',
        'moderately-satisfied': 'neutral',
        'extremely-satisfied': 'happy'
      }
    };

    const imageName = imageNames[questionType][optionValue];
    const filledImage = `/images/filled-${imageName}.png`;
    const unfilledImage = `/images/unfilled-${imageName}.png`;

    
    return optionValue === selectedValue ? filledImage : unfilledImage;
  };

  return (
    <div className="text-gray-300 min-h-screen flex flex-col justify-between">
      <NavBar />
      <main className="flex-grow flex flex-col items-center justify-center text-center">
        <div className="container relative flex flex-col items-center justify-center text-center p-8">
          <h2 className="text-4xl font-bold mb-4 text-white">We Value Your Feedback</h2>
          <form id="feedback-form" className="w-full max-w-3xl bg-white text-black rounded shadow-lg p-8 space-y-4" onSubmit={handleSubmit}>
            <div>
              <p className="text-lg mb-2">How satisfied are you with our service?</p>
              <div className="flex justify-center space-x-4">
                {['not-satisfied', 'moderately-satisfied', 'extremely-satisfied'].map(value => (
                  <label key={value} className="icon-wrapper">
                    <input
                      type="radio"
                      name="service"
                      value={value}
                      className="icon-input hidden"
                      checked={service === value}
                      onChange={(e) => handleChange(e, setService)}
                    />
                    <span className="icon-label">
                      <img
                        src={renderImage('service', value, service)}
                        alt={value}
                      />
                    </span>
                    <span className="icon-description">{value.replace('-', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="text-lg mb-2">How would you rate the cleanliness?</p>
              <div className="flex justify-center space-x-4">
                {['not-satisfied', 'moderately-satisfied', 'extremely-satisfied'].map(value => (
                  <label key={value} className="icon-wrapper">
                    <input
                      type="radio"
                      name="cleanliness"
                      value={value}
                      className="icon-input hidden"
                      checked={cleanliness === value}
                      onChange={(e) => handleChange(e, setCleanliness)}
                    />
                    <span className="icon-label">
                      <img
                        src={renderImage('cleanliness', value, cleanliness)}
                        alt={value}
                      />
                    </span>
                    <span className="icon-description">{value.replace('-', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="text-lg mb-2">How likely are you to recommend us?</p>
              <div className="flex justify-center space-x-4">
                {['not-satisfied', 'moderately-satisfied', 'extremely-satisfied'].map(value => (
                  <label key={value} className="icon-wrapper">
                    <input
                      type="radio"
                      name="recommendation"
                      value={value}
                      className="icon-input hidden"
                      checked={recommendation === value}
                      onChange={(e) => handleChange(e, setRecommendation)}
                    />
                    <span className="icon-label">
                      <img
                        src={renderImage('recommendation', value, recommendation)}
                        alt={value}
                      />
                    </span>
                    <span className="icon-description">{value.replace('-', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" className="bg-[#994a1d] text-white font-bold py-2 px-4 rounded hover:bg-[#C87941]">Submit</button>
            <button type="button" className="bg-[#994a1d] text-white font-bold py-2 px-4 rounded hover:bg-[#C87941] ml-5" onClick={() => navigate('/mainmenu')}>Skip</button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Feedback;
