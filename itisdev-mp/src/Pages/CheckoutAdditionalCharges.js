import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import NavBar from '../Components/NewNavBar';
import Footer from '../Components/Footer';

// Function to format number with commas and PHP symbol
const formatCurrency = (amount) => {
    return `₱${amount.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const CheckoutAdditionalCharges = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const { reservationId } = state || {};
    const [charges, setCharges] = useState([]);
    const [paymentMode, setPaymentMode] = useState('Credit Card'); // Default payment mode
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCharges = async () => {
            try {
                const chargeResponse = await fetch(`/api/charges/${reservationId}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
                
                if (chargeResponse.ok) {
                    const chargeResult = await chargeResponse.json();
                    setCharges(chargeResult); // Assuming `chargeResult` is an array of charges
                } else if (chargeResponse.status === 404) {
                    navigate('/feedback', { state: { reservationId } });
                }
            } catch (error) {
                console.error('Error fetching charges:', error);
                setError('Error fetching charges');
            }
        };

        fetchCharges();
    }, [reservationId, navigate]);

    const totalCharges = charges.reduce((total, charge) => total + (charge.price * charge.quantity), 0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Include the payment mode in the form submission or processing
        alert(`Please insert, swipe, or tap your card to pay!`);
        navigate('/feedback', { state: { reservationId, paymentMode } });
    };

    return (
        <div className="text-gray-300 min-h-screen flex flex-col justify-between">
            <NavBar />
            <main className="flex-grow flex flex-col items-center justify-center text-center">
                <div className="container relative flex flex-col items-center justify-center text-center p-8">
                    <h2 className="text-4xl font-bold mb-4 text-white">Additional Charges</h2>
                    {error && <p className="text-red-500">{error}</p>}
                    <table className="w-full max-w-3xl bg-white text-black rounded shadow-lg">
                        <thead>
                            <tr>
                                <th className="p-4 border-b">Item</th>
                                <th className="p-4 border-b">Quantity</th>
                                <th className="p-4 border-b">Price (PHP)</th>
                                <th className="p-4 border-b">Total (PHP)</th>
                            </tr>
                        </thead>
                        <tbody id="charges-table">
                            {charges.map((charge, index) => (
                                <tr key={index}>
                                    <td className="p-4 border-b">{charge.value}</td>
                                    <td className="p-4 border-b">{charge.quantity}x</td>
                                    <td className="p-4 border-b">{formatCurrency(charge.price)}</td>
                                    <td className="p-4 border-b">{formatCurrency(charge.price * charge.quantity)}</td>
                                </tr>
                            ))}
                            <tr>
                                <td className="p-4 font-bold">Total Charges</td>
                                <td className="p-4 font-bold"></td>
                                <td className="p-4 font-bold"></td>
                                <td className="p-4 font-bold">{formatCurrency(totalCharges)}</td>
                            </tr>
                        </tbody>
                    </table>

                    
                    <div className="pay-dropdown mt-6">
                        <span className="font-semibold">Mode of Payment  </span>
                        <select 
                            className="pay-dropbtn rounded-sm mt-2"
                            value={paymentMode}
                            onChange={(e) => setPaymentMode(e.target.value)}
                        >
                            <option value="Credit Card">Credit/Debit Card</option>
                            <option value="PayPal">PayPal</option>
                            <option value="GCash">GCash</option>
                        </select>
                    </div>

                    <button 
                        id="submit-btn" 
                        type="submit" 
                        className="bg-[#994a1d] text-white font-bold py-2 px-4 rounded hover:bg-[#C87941] mt-6"
                        onClick={handleSubmit}
                    >
                        Confirm Payment
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CheckoutAdditionalCharges;
