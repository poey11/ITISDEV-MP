import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/NewNavBar';
import Footer from '../Components/Footer';

function CheckInPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [pin, setPin] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleCheckIn = async (e) => {
        e.preventDefault();
        const fullName = `${firstName} ${lastName}`;

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
                navigate('/checkin-success', { state: { roomNumber: data.roomNumber } });
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />
            <main className="flex-grow flex flex-col items-center justify-center text-center">
                <div className="container relative flex flex-col items-center justify-center text-center p-8">
                    <div id="check-in-app">
                        <h2 className="text-4xl font-bold mb-4 text-white">Check In</h2>
                        <form id="checkin-form" className="space-y-4" onSubmit={handleCheckIn}>
                            <div>
                                <label className="block text-lg text-white">First Name:</label>
                                <input
                                    type="text"
                                    id="first-name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                    className="w-full p-2 rounded border border-gray-300 text-black"
                                />
                            </div>
                            <div>
                                <label className="block text-lg text-white">Last Name:</label>
                                <input
                                    type="text"
                                    id="last-name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    className="w-full p-2 rounded border border-gray-300 text-black"
                                />
                            </div>
                            <div>
                                <label className="block text-lg text-white">Pin Code:</label>
                                <input
                                    type="password"
                                    id="pin-code"
                                    value={pin}
                                    onChange={(e) => setPin(e.target.value)}
                                    required
                                    className="w-full p-2 rounded border border-gray-300 text-black"
                                />
                            </div>
                            <button id="checkin-submit-btn" type="submit" className="bg-[#994a1d] text-white font-bold py-2 px-4 rounded hover:bg-[#C87941]">Check In</button>
                        </form>
                        {error && <p className="mt-4 text-lg text-red-600">{error}</p>}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default CheckInPage;
