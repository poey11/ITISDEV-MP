import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/NewNavBar';
import Footer from '../Components/Footer';

function CheckInPage() {
    const [fullName, setFullName] = useState('');
    const [pin, setPin] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleCheckIn = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fullName, pin })
            });

            const data = await response.json();

            if (response.ok) {
                alert(`Check-In Success! Please get your keycards and go to room ${data.roomNumber}. Enjoy your stay!`);
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <body className="min-h-screen flex flex-col">
            <NavBar />
            <main class="flex-grow flex flex-col items-center justify-center text-center">
                <div class="container relative flex flex-col items-center justify-center text-center p-8">
                    <div id="check-in-app">
                        <h2 class="text-4xl font-bold mb-4 text-white">Check In</h2>
                        <form id="checkin-form" class="space-y-4">
                            <div>
                                <label class="block text-lg text-white">First Name:</label>
                                <input
                                    type="text"
                                    id="first-name"
                                    required
                                    class="w-full p-2 rounded border border-gray-300 text-black"
                                />
                            </div>
                            <div>
                                <label class="block text-lg text-white">Last Name:</label>
                                <input
                                    type="text"
                                    id="last-name"
                                    required
                                    class="w-full p-2 rounded border border-gray-300 text-black"
                                />
                            </div>
                            <div>
                                <label class="block text-lg text-white">Pin Code:</label>
                                <input
                                    type="password"
                                    id="pin-code"
                                    required
                                    class="w-full p-2 rounded border border-gray-300 text-black"
                                />
                            </div>
                            <button id="checkin-submit-btn" type="submit" class="bg-[#994a1d] text-white font-bold py-2 px-4 rounded hover:bg-[#C87941]">Check In</button>
                        </form>
                        <p class="mt-4 text-lg"></p>
                    </div>
                </div>
            </main>
            <Footer/>
        </body>
    );
}

export default CheckInPage;
