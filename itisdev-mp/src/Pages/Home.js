
import { useNavigate } from "react-router-dom"; 

const  Home = () => {
   const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const reservationData = {
            roomType: document.getElementById('roomType').value,
            checkIn: document.getElementById('checkIn').value,
            checkOut: document.getElementById('checkOut').value,
        };
            navigate('/rooms',{state: {reservationData}});
            
    };
    return ( 
        <div className = 'Home'>
            <h1 className="text-2xl text-center">Book Room</h1>
            <h1 className ='text-center'><b> Will be revised in the future. For now will be 
            used to test Prototype Reserving Rooms function and backend </b></h1>    
            <div className="flex justify-center">
                <form className="w-1/2" onSubmit = {handleSubmit} >
                    <label htmlFor="roomType">Room Type</label>
                    <select name="roomType" id="roomType" className="w-full bg-gray-300  pl-1">
                        <option value="Single">Single</option>
                        <option value="Double">Double</option>
                        <option value="Suite">Suite</option>
                        <option value="Luxury">Luxury</option>
                    </select>
                    <label htmlFor="checkIn">Check In</label>
                    <input type="date" name="checkIn" id="checkIn" className="w-full bg-gray-300  pl-1"/>
                    <label htmlFor="checkOut">Check Out</label>
                    <input type="date" name="checkOut" id="checkOut" className="w-full  mb-5  bg-gray-300  pl-1"/>
                  

                    <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Book Room</button>
                </form>
            </div>
        </div>
     );
}

export default  Home;