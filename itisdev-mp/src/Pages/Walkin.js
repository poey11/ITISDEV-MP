import NavBar from '../Components/NewNavBar';
import Footer from '../Components/Footer';
import React, { useState, useEffect } from 'react';    
import { useNavigate  } from "react-router-dom";

const Walkin = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('');   
    const [currentDate, setCurrentDate] = useState('');


    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        const day = String(today.getDate()).padStart(2, '0'); 
        const formattedDate = `${year}-${month}-${day}`;
        setCurrentDate(formattedDate);
    }, []);

    const rooms = [
         {
            roomTitle: "Cozy Single Room",
            roomPrice: "70",
            roomDescription: "A comfortable single room with a twin bed, free Wi-Fi, a flat-screen TV, and a small work desk. Perfect for solo travelers.",
            roomType: "Single",
            roomImage: "../images/single.jpg"
          },   
          {
            roomTitle: "Standard Double Room",
            roomPrice: "120",
            roomDescription: "A spacious room with a queen-size bed, private bathroom, free Wi-Fi, a flat-screen TV, and a work desk. Ideal for couples or business travelers.",
            roomType: "Double",
            roomImage: "../images/double.png"
          }, 
          {
            roomTitle: "Executive Suite",
            roomPrice: "250",
            roomDescription: "A luxurious suite with a king-size bed, a separate living area, free Wi-Fi, two flat-screen TVs, a minibar, and a large bathroom with a Jacuzzi. Perfect for business travelers or special occasions.",
            roomType: "Suite",
            roomImage: "../images/suite.jpg"
          }, 
          {
            roomTitle: "Presidential Luxury Suite",
            roomPrice: "500",
            roomDescription: "The epitome of luxury with a king-size bed, a grand living room, free Wi-Fi, three flat-screen TVs, a private dining area, a full kitchen, and a large bathroom with a Jacuzzi. Perfect for VIP guests.",
            roomType: "Luxury",
            roomImage: "../images/luxury.jpg"
          }
    ]
    const handleSubmit = (e) => {
        e.preventDefault();
         const reservationData = {
            roomPrice: price.replace('₱','').replace(' per night',''),
            roomTitle: title,
            roomType:type,
            checkIn: currentDate,
            checkOut: document.getElementById('datepicker-range-end').value,
        };
        navigate('/guestinfo', {state: {reservationData}});
            
    };
      const selectRoom = (element) =>{
      const rooms = document.querySelectorAll('.room-box');
        rooms.forEach(room => room.classList.remove('selected'));
        element.classList.add('selected');
        setTitle(element.querySelector('.title').textContent);
        setPrice(element.querySelector('.price').textContent);
        setType(element.querySelector('.type').textContent);
      
    }



    return (  
        <body className="bg-gray-900 text-gray-300 min-h-screen flex flex-col">
            <NavBar />
            <main className="flex-grow flex flex-col items-center justify-center text-center space-y-4">
                <form id="booking-form" className="flex-grow flex flex-col items-center justify-center text-center space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        {rooms.map((room, index) => (
                            <div key = {index} className="room-box" onClick={(e) => selectRoom(e.currentTarget)}>
                            <img src={room.roomImage} alt=''/>
                            <h3 className="title">{room.roomTitle}</h3>
                            <p className="type hidden">{room.roomType}</p>
                            <p className="price"><b>₱{room.roomPrice} per night</b></p>
                            <p>{room.roomDescription}</p>
                        </div>
                        ))}
                    </div>

                    <div className="flex flex-col items-center mt-4 space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <input id="datepicker-range-start" name="start" type="date" className="date-picker bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5" placeholder="Select date start" defaultValue={currentDate} disabled  required/>
                            </div>
                            <div className="relative ml-4">
                                <input  id="datepicker-range-end" name="end" type="date" className="date-picker bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Select date end" required/>
                            </div>
                        </div>
                        <button type="submit" className="book-button mt-4" onClick={handleSubmit}>Book Now</button>
                    </div>
                </form>
            </main>
            <Footer />
        </body>

    );
}
 
export default Walkin;