import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import NavBar from '../Components/NewNavBar';
import Footer from '../Components/Footer';

const Modal = ({ isVisible, message, onClose }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <p className="text-black">{message}</p>
                <button
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={onClose}
                >
                    OK
                </button>
            </div>
        </div>
    );
};

const CheckoutVerification = () => {
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [reservationId, setReservationId] = useState('');
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        const roomNumber = document.getElementById('room-number').value;
        const pin = document.getElementById('pin-code').value;
        
        const response = await fetch(`/api/check/checkout`, {
            method: 'POST',
            body: JSON.stringify({ roomNumber, pin }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        const result = await response.json();

        if(response.ok) {
            setReservationId(result);
            setModalMessage(`Checkout successful for ${roomNumber}. Please insert your room key card.`);
            setIsModalVisible(true);
        } else {
            setModalMessage("Sorry, we couldn't find your information. Please check your details and try again or contact the hotel staff for assistance.");
            setIsModalVisible(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        if (modalMessage.includes("successful")) {
            navigate('/checkoutWCharges', { state: { reservationId } });
        } else {
            document.getElementById('room-number').value = '';
            document.getElementById('pin-code').value = '';
        }
    };


    return (
        <body className="text-gray-300 min-h-screen flex flex-col justify-between">
            <NavBar />
            <main className="flex-grow flex flex-col items-center justify-center text-center">
                <div className="container relative flex flex-col items-center justify-center text-center p-8">
                    <div id="check-out-app">
                        <h2 className="text-4xl font-bold mb-4 text-white">Check Out</h2>
                        <form id="checkout-form" className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-lg">Room Number</label>
                                <input
                                    type="text"
                                    id="room-number"
                                    required
                                    className="w-full p-2 rounded border border-gray-300 text-black"
                                />
                            </div>
                            <div>
                                <label className="block text-lg">Pin Code:</label>
                                <input
                                    type="password"
                                    id="pin-code"
                                    required
                                    className="w-full p-2 rounded border border-gray-300 text-black"
                                />
                            </div>
                            <button id="submit-btn" type="submit" className="bg-[#994a1d] text-white font-bold py-2 px-4 rounded hover:bg-[#C87941]">Check Out</button>
                        </form>
                        <p className="mt-4 text-lg"></p>
                    </div>
                </div>
            </main>
            <Footer />
            <Modal isVisible={isModalVisible} message={modalMessage} onClose={handleCloseModal} />
        </body>
    );
};

export default CheckoutVerification;