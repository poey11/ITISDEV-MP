import React, { useState,useEffect } from 'react';
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
    const {reservationId } = state || {};
    const [charges, setCharges] = useState([]);
    /* so ung ginagawa ung fucntion n to is to get the charges ni guest pagkaload ng page. need mo ipasa ung reservationData from chekoutverification tas pwd mo na iremove ung comments*/
    // useEffect(() => {
    //     const fetchCharges = async () => {
    //         try{
    //             const chargeResponse = await fetch(`/api/charges/${reservationId}`,
    //             {  
    //                  method: 'GET',
    //                 headers: { 'Content-Type': 'application/json' }
    //             }
    //             );
    //             const chargeResult = await chargeResponse.json();
    //             setCharges(chargeResult);
    //             if(chargeResponse.status === 404){
    //                 navigate('/feedback', { state: {reservationId}  });
    //             }
    //         } catch (error) {
    //             console.error('Error fetching charges:', error);
    //         }
    //     };

    //     fetchCharges();
    // },[]);// eslint-disable-line react-hooks/exhaustive-deps

    // Calculate total additional charges
    // const totalCharges = charges.reduce((total, charge) => total + (charge.price * charge.quantity), 0);

    // const handleSubmit = async(e) => {
    //     e.preventDefault();
    //     alert('Payment confirmed!');        
    //     navigate('/feedback', { state: {reservationId}  });
    // };

    /*remove mo to pang test ko lang ng redirect */
    const test = () => {    
        navigate('/feedback' ); 
    }
    return (
       
        <body className="text-gray-300 min-h-screen flex flex-col justify-between">
            <NavBar />

            <main className="flex-grow flex flex-col items-center justify-center text-center">
                <div className="container relative flex flex-col items-center justify-center text-center p-8">
                    <h2 className="text-4xl font-bold mb-4 text-white">Additional Charges</h2>
                    <table className="w-full max-w-3xl bg-white text-black rounded shadow-lg">
                        <thead>
                            <tr>
                                <th className="p-4 border-b">Item</th>
                                <th className="p-4 border-b">Quantity</th>
                                <th className="p-4 border-b">Amount (PHP)</th>
                            </tr>
                        </thead>
                        <tbody id="charges-table">
                            
                            <tr>
                                <td className="p-4 border-b">Room Service</td>
                                <td className="p-4 border-b">1x</td>
                                <td className="p-4 border-b">₱500</td>
                            </tr>
                            <tr>
                                <td className="p-4 border-b">Mini Bar</td>
                                <td className="p-4 border-b">1x</td>
                                <td className="p-4 border-b">₱300</td>
                            </tr>
                        
                            <tr>
                                <td className="p-4 font-bold">Total</td>
                                <td className="p-4 font-bold"></td>
                                <td className="p-4 font-bold" id="total-amount">800</td>
                            </tr>
                        </tbody>
                    </table>

                    <button id="submit-btn" type="submit" className="bg-[#994a1d] text-white font-bold py-2 px-4 rounded hover:bg-[#C87941]" onClick={test}>Confirm Payment</button>
                </div>
            </main>

        

            <Footer />
        </body>
        
    );
};

export default CheckoutAdditionalCharges;
