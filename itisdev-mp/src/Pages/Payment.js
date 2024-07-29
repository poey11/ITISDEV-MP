import { useNavigate } from "react-router-dom"; 
import { useLocation } from 'react-router-dom';


const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const { reservationData, roomTitle, roomPrice,guest } = state || {};
    const handleSubmit = async (e) => {
        e.preventDefault();
        const reservation ={
            roomTitle: roomTitle,
            roomType: reservationData.roomType,
            checkIn: reservationData.checkIn,
            checkOut: reservationData.checkOut,
            days: getNumberOfDays(reservationData.checkIn, reservationData.checkOut)
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
        }else{
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
               alert('Payment Successful. Please check your email for the confirmation of your reservation and pin code for checking In/Out.');
               navigate('/');
        }
        

    };

    const getNumberOfDays = (checkInDate, checkOutDate) => {
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const timeDifference = checkOut.getTime() - checkIn.getTime();
        const daysDifference = timeDifference / (1000 * 3600 * 24); // Convert time difference from milliseconds to days
        return daysDifference;
    };
    const days = getNumberOfDays(reservationData.checkIn, reservationData.checkOut);
    return (
        <div className="flex justify-center">
            <form className="w-1/2">
           
                <h1 className="text-2xl text-center">Payment</h1>
                <h1 className="text-2xl text-center">Total: <b>${parseFloat(days) * parseInt(roomPrice)}</b> </h1>
                <h1 className="text-1xl">Items: </h1>
                <h1 className=" text-gray-600"><b>{roomTitle} - ${roomPrice} x {days}</b></h1>
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