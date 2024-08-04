import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../Components/NewNavBar';
import Footer from '../Components/Footer';

function CheckInSuccessPage() {
    const location = useLocation();
    const { roomNumber } = location.state || { roomNumber: 'unknown' };

    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />
            <main className="flex-grow flex flex-col items-center justify-center text-center">
                <div className="container relative flex flex-col items-center justify-center text-center p-8">
                    <h2 className="text-4xl font-bold mb-4 text-white">Check-In Successful!</h2>
                    <p className="text-lg text-white">Please get your keycards and go to room {roomNumber}. Enjoy your stay!</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default CheckInSuccessPage;
