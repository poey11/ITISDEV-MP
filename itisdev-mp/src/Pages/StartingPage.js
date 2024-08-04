import React from 'react';
import "../Styling/styles.css";
import { useNavigate } from "react-router-dom"; 
import NavBar from '../Components/NewNavBar';
import Footer from '../Components/Footer';
const StartingPage = () => {
    const navigate = useNavigate();
    const gotoMainMenu = () => {    
        navigate('/mainmenu');
    }
   

    return (
        <div className="text-gray-300 min-h-screen flex flex-col justify-between">
            <NavBar />
            <main className="flex-grow flex flex-col items-center justify-center text-center">
                <div className="container relative flex flex-col items-center justify-center text-center p-8">
                    <div id="hotel">
                        <h1 className="text-6xl font-bold mb-4 text-[#D3836]">Hotel Manila</h1>
                        <button id="continue-btn" onClick={gotoMainMenu}>Tap to Continue</button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default StartingPage;
