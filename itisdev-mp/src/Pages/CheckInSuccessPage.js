import React from 'react';
import { useLocation } from 'react-router-dom';

function CheckInSuccessPage() {
    const location = useLocation();
    const { roomNumber } = location.state || { roomNumber: 'unknown' };

    return (
        <div className="check-in-success">
            <h2>Check-In Successful!</h2>
            <p>Please get your keycards and go to room {roomNumber}. Enjoy your stay!</p>
        </div>
    );
}

export default CheckInSuccessPage;
