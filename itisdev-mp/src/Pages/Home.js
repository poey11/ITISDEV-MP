
const  Home = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const reservationData = {
            reservedUnderName: document.getElementById('name').value,
            roomType: document.getElementById('roomType').value,
            checkIn: document.getElementById('checkIn').value,
            checkOut: document.getElementById('checkOut').value,
            NoOfAdults: document.getElementById('adults').value,
            NoOfChildren: document.getElementById('children').value,
            paymentMethod: document.getElementById('payment').value,
        };
        
        try {
         
            const response = await fetch('/api/reserve', {
                method: 'POST',
                body: JSON.stringify(reservationData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (response.ok) { 
                alert("Reservation successful under the name " + reservationData.reservedUnderName);
            }

        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while making the reservation.');
        }
        document.getElementById('name').value = "";
        document.getElementById('roomType').value = "";
        document.getElementById('checkIn').value = "";
        document.getElementById('checkOut').value = "";
        document.getElementById('adults').value = "";
        document.getElementById('children').value = "";
        document.getElementById('payment').value = "";
    };
    return ( 
        <div className = 'Home'>
            <h1 className="text-2xl text-center">Book Room</h1>
            <h1 className ='text-center'><b> Will be revised in the future. For now will be 
            used to test Prototype Reserving Rooms function and backend </b></h1>    
            <div className="flex justify-center">
                <form className="w-1/2" onSubmit = {handleSubmit} >
                    <label htmlFor="name">Reservation under the name</label>
                    <input type="text" name="name" id="name" className="w-full bg-gray-300 pl-1" placeholder="Full Name"  />
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
                    <input type="date" name="checkOut" id="checkOut" className="w-full  bg-gray-300  pl-1"/>
                    <label htmlFor="adults">No. of Adults</label>
                    <input type="number" name="adults" id="adults" className="w-full  bg-gray-300  pl-1"/>
                    <label htmlFor="children">No. of Children</label>
                    <input type="number" name="children" id="children" className="w-full  bg-gray-300  pl-1"/>
                    <label htmlFor="name">Payment </label>
                   <select name="payment" id="payment" className="w-full bg-gray-300 mb-5  pl-1">
                        <option value="Cash">Cash</option>
                        <option value="Credit">Credit</option>
                    </select>
                    <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Book Room</button>
                </form>
            </div>
        </div>
     );
}

export default  Home;