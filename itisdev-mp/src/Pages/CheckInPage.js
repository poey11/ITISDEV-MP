import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
                navigate('/checkin-success', { state: { roomNumber: data.roomNumber } });
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="check-in-page">
            <h2>Check-In</h2>
            <form onSubmit={handleCheckIn}>
                <div>
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="pin">Pin Code</label>
                    <input
                        type="text"
                        id="pin"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Check In</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
}

export default CheckInPage;
