import { useNavigate } from "react-router-dom";
import { useState } from 'react';


const Modal = ({ isVisible, message, onClose }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <p>{message}</p>
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
        const roomNumber = document.getElementById('roomNumber').value;
        const pin = document.getElementById('pin').value;
        console.log(roomNumber)
        console.log(pin)
        
        const response = await fetch(`/api/check/checkout`, {
            method: 'POST',
            body: JSON.stringify({ roomNumber, pin }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        const result = await response.json();

        if(response.ok) {
            setModalMessage(`Checkout successful for ${roomNumber}. Please insert your room key card.`);
            setIsModalVisible(true);
        } else {
            setModalMessage("Sorry, we couldn't find your information. Please check your details and try again or contact the hotel staff for assistance.");
            setIsModalVisible(true);
        }
        console.log(result);
        setReservationId(result);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        if (modalMessage.includes("successful")) {
            navigate('/CheckoutAdditionalCharges',{state:{reservationId}} );
        } else {
            // Clear form fields
            document.getElementById('roomNumber').value = '';
            document.getElementById('pin').value = '';
        }
    };

    return (
        <div className="flex justify-center">
            <form className="w-1/2" onSubmit={handleSubmit}>
                <h2 className="text-2xl text-center">Checkout Verification</h2>
                <label htmlFor="roomNumber">Room Nos</label>
                <input
                    type="text"
                    name="roomNumber"
                    id="roomNumber"
                    className="w-full bg-gray-300 pl-1"
                    placeholder="Room Nos"
                />
               
                <label htmlFor="pin">PIN</label>
                <input
                    type="password"
                    name="pin"
                    id="pin"
                    className="w-full bg-gray-300 pl-1"
                    placeholder="PIN"
                    
                />
                <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">
                    Confirm
                </button>
            </form>
            <Modal
                isVisible={isModalVisible}
                message={modalMessage}
                onClose={handleCloseModal}
            />
        </div>
    );
};

export default CheckoutVerification;
