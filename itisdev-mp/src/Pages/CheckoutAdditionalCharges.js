import React, { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';


// Function to format number with commas and PHP symbol
const formatCurrency = (amount) => {
    return `₱${amount.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const CheckoutAdditionalCharges = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const {reservationId } = state || {};
    const [charges, setCharges] = useState([]);

    useEffect(() => {
        const fetchCharges = async () => {
            try{
            const chargeResponse = await fetch(`/api/charges/${reservationId}`);
            const chargeResult = await chargeResponse.json();
            setCharges(chargeResult);
            } catch (error) {
                console.error('Error fetching charges:', error);
            }
        };

        fetchCharges();
    },[]);

    // Calculate total additional charges
    const totalCharges = charges.reduce((total, charge) => total + (charge.price * charge.quantity), 0);

    const handleSubmit = async(e) => {
        e.preventDefault();
        alert('Payment confirmed!');        
        console.log(charges)
        navigate('/feedback', { state: {reservationId}  });
    };

    return (
        <div className="flex flex-col items-center p-4">
            <h2 className="text-2xl mb-4">Additional Charges</h2>
            <div className="w-1/2 mb-4">
                <table className="w-full bg-gray-100 border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border-b px-4 py-2">Item</th>
                            <th className="border-b px-4 py-2">Quantity</th>
                            <th className="border-b px-4 py-2">Price (PHP)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {charges.map((charge, index) => (
                            <tr key={index}>
                                <td className="border-b px-4 py-2">{charge.value}</td>
                                <td className="border-b px-4 py-2">{charge.quantity}</td>
                                <td className="border-b px-4 py-2">{formatCurrency(charge.price)}</td>
                            </tr>
                        ))}
                        <tr>
                            <td className="border-b px-4 py-2 font-bold">Total</td>
                            <td className="border-b px-4 py-2"></td>
                            <td className="border-b px-4 py-2 font-bold">{formatCurrency(totalCharges)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <form className="w-1/2" onSubmit={handleSubmit}>
                <h2 className="text-2xl mb-4">Payment Information</h2>
                
                <label htmlFor="CardNumber">Card Number</label>
                <input
                    type="text"
                    name="CardNumber"
                    id="CardNumber"
                    className="w-full bg-gray-300 pl-1 mb-2"
                    placeholder="4123 2323 0982 4520"
                />
                
                <label htmlFor="nameOnCard">Card Holder Name</label>
                <input
                    type="text"
                    name="nameOnCard"
                    id="nameOnCard"
                    className="w-full bg-gray-300 pl-1 mb-2"
                    placeholder="Juan Dela Cruz"
                />
                
                <label htmlFor="expiryDate">Expiry Date</label>
                <input
                    type="text"
                    name="expiryDate"
                    id="expiryDate"
                    className="w-full bg-gray-300 pl-1 mb-2"
                    placeholder="MM/YY"
                />
                
                <label htmlFor="cvv">CVV/CVV2</label>
                <input
                    type="text"
                    name="cvv"
                    id="cvv"
                    className="w-full bg-gray-300 pl-1 mb-2"
                    placeholder="CVV"
                />
                
                <label htmlFor="billingAddress">Billing Address</label>
                <input
                    type="text"
                    name="billingAddress"
                    id="billingAddress"
                    className="w-full bg-gray-300 pl-1 mb-5"
                    placeholder="Billing Address"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Confirm Payment
                </button>
            </form>
        </div>
    );
};

export default CheckoutAdditionalCharges;
