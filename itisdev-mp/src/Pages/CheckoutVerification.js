import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

// Dummy data for verification
const dummyData = {
    firstName: "Justine",
    lastName: "Rosete",
    pin: "123456"
};

// Modal Component
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
    const location = useLocation();
    const { state } = location;
    const { reservationData, roomTitle, roomPrice, guest } = state || {};

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const pin = document.getElementById('pin').value;

        if (firstName === dummyData.firstName && lastName === dummyData.lastName && pin === dummyData.pin) {
            setModalMessage(`Verification successful for ${firstName} ${lastName}. Please insert your room key card.`);
            setIsModalVisible(true);
        } else {
            setModalMessage("Sorry, we couldn't find your information. Please check your details and try again or contact the hotel staff for assistance.");
            setIsModalVisible(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        if (modalMessage.includes("successful")) {
            navigate('/CheckoutAdditionalCharges', { state: { reservationData, roomTitle, roomPrice, guest } });
        } else {
            // Clear form fields
            document.getElementById('firstName').value = '';
            document.getElementById('lastName').value = '';
            document.getElementById('pin').value = '';
        }
    };

    return (
        <div className="flex justify-center">
            <form className="w-1/2" onSubmit={handleSubmit}>
                <h2 className="text-2xl text-center">Checkout Verification</h2>
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="w-full bg-gray-300 pl-1"
                    placeholder="First Name"
                />
                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="w-full bg-gray-300 pl-1"
                    placeholder="Last Name"
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
