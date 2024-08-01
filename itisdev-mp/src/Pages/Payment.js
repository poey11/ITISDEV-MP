import { useNavigate } from "react-router-dom"; 
import { useLocation } from 'react-router-dom';


const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const { reservationData, roomTitle, roomPrice,guest } = state || {};

    function randomRoomNumber(roomType){
        let roomNumber='';
        if(roomType === 'Single'){  
            roomNumber += 1;
        }
        else if(roomType === 'Double'){
            roomNumber += 2;
        }
        else if(roomType === 'Suite'){
            roomNumber += 3;
        }
        else if(roomType === 'Luxury'){
            roomNumber += 4;
        }
        for(let i=0; i<2; i++){
            roomNumber += Math.floor(Math.random() * 10);
        }
        return roomNumber;
    }
    
    function pinGenerator(){
        let pin = '';
        for(let i=0; i<5; i++){
            pin += Math.floor(Math.random() * 10);
        }
        return pin;
    }

    const getNumberOfDays = (checkInDate, checkOutDate) => {
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const timeDifference = checkOut.getTime() - checkIn.getTime();
        const daysDifference = timeDifference / (1000 * 3600 * 24); // Convert time difference from milliseconds to days
        return daysDifference;
    };
    const days = getNumberOfDays(reservationData.checkIn, reservationData.checkOut);
    const emailText = "Thank you for choosing our hotel. Your reservation details are as follows: \n\n" 
    + "Reservation Named Under: " + guest.title +". "+ guest.fullName + "\n"
    + "Room Title: " + roomTitle + "\n"
    + "Room Type: " + reservationData.roomType + "\n"
    + "Check In: " + reservationData.checkIn + "\n"
    + "Check Out: " + reservationData.checkOut + "\n"
    + "Nos of Days: " + days + " Days\n"
    + "Total Amount: $" + parseFloat(days) * parseInt(roomPrice) + "\n"
    + "Check In/out Pin: " + pinGenerator() + "\n\n"
    + "Thank you for booking in our hotel and have a great day!";

    const handleSubmit = async (e) => {
        e.preventDefault();
        let roomAvailable = false;
        let roomNumber;
        while (!roomAvailable) {
          
            const roomRandom = randomRoomNumber(reservationData.roomType);
            const getRoomDetails = await fetch(`/api/reserve/${roomRandom}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const roomDetails = await getRoomDetails.json();
    
            if (getRoomDetails.status === 404) { // if the status is 404 then it means the room is available
                roomNumber = roomRandom
                roomAvailable = true; // exit the loop
            } else if (getRoomDetails.status === 200) { // if the status is 200 then it means the room is not available
                roomAvailable = false; // continue the loop
            } else { // if the status is not 200 or 404 then it means an error occurred
                alert("Error Occurred");
                navigate('/');
                return;
            }
        }
        const reservation ={
            roomTitle: roomTitle,
            roomType: reservationData.roomType,
            checkIn: reservationData.checkIn,
            checkOut: reservationData.checkOut,
            days: getNumberOfDays(reservationData.checkIn, reservationData.checkOut),
            roomNumber:roomNumber,
            pin: pinGenerator()
        }
        
        const reservationResponse = await fetch('/api/reserve', {
            method: 'POST',
            body: JSON.stringify(reservation),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const reservationResult = await reservationResponse.json();
        if (!reservationResponse.ok) {
            alert(reservationResult.error);
            return;
        }
        const guestInfo = {
             title: guest.title,
             fullName: guest.fullName,
             gender: guest.gender,   
             email: guest.email,
             phone: guest.phone,
             address: guest.address,
             reservationId: reservationResult._id
        };
         const guestResponse = await fetch('/api/record', {
             method: 'POST',
             body: JSON.stringify(guestInfo),
             headers: {
                 'Content-Type': 'application/json',
             },
         });
         const guestResult = await guestResponse.json();
         if (!guestResponse.ok) {
             alert(guestResult.error);
             return;
         }
            
        // const email = {
        //     email: guest.email,
        //     subject: 'Hotel Reservation Details',
        //     text: emailText,
        // };
        // const emailResponse = await fetch('/api/send-email', {
        //     method: 'POST',
        //     body: JSON.stringify(email),
        //     headers: {
        //         'Content-Type': 'application/json', 
        //     },
        // });
        // const emailResult = await emailResponse.json();
        // if (!emailResponse.ok) {
        //     alert(emailResult.error);
        //     return;
        // }
        alert('Reservation Successful. Reservation details sent to email!');
        navigate('/');
    };

    
    return (
        <div className="flex justify-center">
            <form className="w-1/2">
                <h1 className="text-2xl text-center">Payment</h1>
                <h1 className="text-2xl text-center">Total: <b>${parseFloat(days) * parseInt(roomPrice)}</b> </h1>
                <h1 className="text-1xl">Items: </h1>
                <h1 className=" text-gray-600"><b>{roomTitle} - ${roomPrice} x {days} Days</b></h1>
                <label htmlFor="CardNumber">Card Number</label>
                <input type="text" name="CardNumber" id="CardNumber" className="w-full bg-gray-300 pl-1" placeholder="4123 2323 0982 4520" />
                <label htmlFor="nameOnCard">Card Holder Name</label>
                <input type="text" name="nameOnCard" id="nameOnCard" className="w-full bg-gray-300 pl-1" placeholder="Juan Dela Cruz" />
                <label htmlFor="expiryDate">Expiry Date</label>
                <input type="text" name="expiryDate" id="expiryDate" className="w-full bg-gray-300 pl-1" placeholder="MM/YY" />
                <label htmlFor="cvv">CVV/CVV2</label>
                <input type="text" name="cvv" id="cvv" className="w-full bg-gray-300 pl-1" placeholder="CVV" />
                <label htmlFor="billingAddress">Billing Address</label>
                <input type="text" name="billingAddress" id="billingAddress" className="w-full bg-gray-300 pl-1 mb-5" placeholder="Billing Address" />
                <button className="w-36 bg-red-500 hover:bg-red-700   text-white font-bold py-2 px-4 rounded" onClick={() => navigate('/')}>Back</button>
                <button className="w-36 bg-blue-500 hover:bg-blue-700 ml-3.5 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>Pay</button>

            </form>
        </div>
      );
}
 
export default Payment;