import { useNavigate, useLocation } from 'react-router-dom';
import NavBar from '../Components/NewNavBar';
import Footer from '../Components/Footer';

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const {reservationData, guestData } = state || {};
    const getNumberOfDays = (checkInDate, checkOutDate) => {
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const timeDifference = checkOut.getTime() - checkIn.getTime();
        const daysDifference = timeDifference / (1000 * 3600 * 24); // Convert time difference from milliseconds to days
        return daysDifference;
    };
    const numberOfDays = getNumberOfDays(reservationData.checkIn, reservationData.checkOut)


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
    const pin = pinGenerator();
  
    const emailText = "Thank you for choosing our hotel. Your reservation details are as follows: \n\n" 
    + "Reservation Named Under: " + guestData.fullName+"\n"
    + "Room Title: " + reservationData.roomTitle + "\n"
    + "Room Type: " + reservationData.roomType + "\n"
    + "Check In: " + reservationData.checkIn + "\n"
    + "Check Out: " + reservationData.checkOut + "\n"
    + "Nos of Days: " + numberOfDays + " Days\n"
    + "Total Amount: $" +reservationData.roomPrice * numberOfDays+ "\n"
    + "Check In/out Pin: " + pin + "\n\n"
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
            roomTitle: reservationData.roomTitle,
            roomType: reservationData.roomType,
            checkIn: reservationData.checkIn,
            checkOut: reservationData.checkOut,
            days: getNumberOfDays(reservationData.checkIn, reservationData.checkOut),
            roomNumber:roomNumber,
            pin: pin
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
             title: guestData.title,
             fullName: guestData.fullName,
             gender: guestData.gender,   
             email: guestData.email,
             phone: guestData.phone,
             address: guestData.address,
             reservationId: reservationResult._id
        };
         const guestResponse = await fetch('/api/record', {
             method: 'POST',
             body: JSON.stringify(guestInfo),
             headers: {
                 'Content-Type': 'application/json',
             },
         });
         

         const chargeResponse = await fetch('/api/charges', {
            method: 'POST',
            body: JSON.stringify({ reservationId: reservationResult._id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const chargeResult = await chargeResponse.json();
        if (!chargeResponse.ok) {
            alert(chargeResult.error);
            return;
        }

         const guestResult = await guestResponse.json();
         if (!guestResponse.ok) {
             alert(guestResult.error);
             return;
         }
            
        const email = {
            email: guestData.email,
            subject: 'Hotel Reservation Details',
            text: emailText,
        };
        const emailResponse = await fetch('/api/send-email', {
            method: 'POST',
            body: JSON.stringify(email),
            headers: {
                'Content-Type': 'application/json', 
            },
        });
        const emailResult = await emailResponse.json();
        if (!emailResponse.ok) {
            alert(emailResult.error);
            return;
        }


        alert('Please insert, swipe, or tap your card at the terminal to pay. After Confirming payment, you will receive an email with your reservation details. Thank you for choosing our hotel.');
        navigate('/mainmenu');
    };
    
    
    return (
        <body className="text-gray-300 min-h-screen flex flex-col justify-between bg-[#431412]">
            <NavBar />
            <main className="flex-grow flex items-center justify-center p-8">
                <div className="pay-container bg-gray-800 rounded-lg shadow-lg p-6">
                    <h2 className="pay-title text-3xl font-semibold text-center mb-6">Payment</h2>
                    <div className="pay space-y-4">
                        <div className="pay-details">
                            <span className="font-semibold">Room Type: {reservationData.roomTitle} </span> 
                        </div>
                        <div className="pay-details">
                            <span className="font-semibold">Start Date: {reservationData.checkIn}</span> 
                        </div>
                        <div className="pay-details">
                            <span className="font-semibold">End Date: {reservationData.checkOut}</span> 
                        </div>
                        <div className="pay-details">
                            <span className="font-semibold">Nos of Days: {numberOfDays}</span> 
                        </div>
                       
                        <div className="pay-total text-xl font-bold">
                            <span className="font-semibold">Total Amount: ₱{reservationData.roomPrice} x {numberOfDays} day(s) = ₱{reservationData.roomPrice * numberOfDays} </span> 
                        </div>
                        <div className="pay-total text-xl font-bold">
                            <span className="font-semibold">Mode of Payment:</span> 
                     </div>
                    </div>

                  
                    <div className="pay-dropdown mt-6">
                        <select  className="pay-dropbtn rounded-sm ">
                            <option value="Credit Card">Credit/Debit Card</option>
                            <option value="PayPal">PayPal</option>
                            <option value="GCash">GCash</option>
                        </select>
                       
                    </div>
                    <div>
                        <button className="pay-button mt-6" onClick={handleSubmit}>Pay Now</button>
                    </div>
                   
                    
                </div>
            </main>
            <Footer />
        </body>
      );
}
 
export default Payment;