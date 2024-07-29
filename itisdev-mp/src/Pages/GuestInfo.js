import { useNavigate } from "react-router-dom"; 
import { useLocation } from 'react-router-dom';


const GuestInfo = () => {
    const location = useLocation();
    const { state } = location;
    const { reservationData, roomTitle, roomPrice } = state || {};
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const guest = {
            title: document.getElementById('title').value,
            fullName: document.getElementById('name').value + ' ' + document.getElementById('surname').value,
            gender: document.getElementById('gender').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
        }
        navigate('/payment', {state: {reservationData, roomTitle, roomPrice,guest}});
    };

    return (  
        <div className="flex justify-center">
            <form className="w-1/2 " onSubmit={handleSubmit} >
                <h2 className="text-2xl text-center">Guest Information</h2>
                <label htmlFor="title">Title</label>
                <select name="title" id="title" className="w-full bg-gray-300 pl-1">
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Ms">Ms</option>
                    <option value="Dr">Dr</option>
                </select>
                <label htmlFor="name">First Name</label>
                <input type="text" name="name" id="name" className="w-full bg-gray-300 pl-1" placeholder="First Name"  />
                <label htmlFor="surname">Last Name</label>
                <input type="text" name="surname" id="surname" className="w-full bg-gray-300 pl-1" placeholder="Last Name" />
                <label htmlFor="gender">Gender</label>
                <select name="gender" id="gender" className="w-full bg-gray-300 pl-1">
                    <option value = "Male">Male</option>
                    <option value ="Female">Female</option>
                    <option value ="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                </select>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" className="w-full bg-gray-300 pl-1" placeholder="Email" />
                <label htmlFor="phone">Phone</label>
                <input type="tel" name="phone" id="phone" className="w-full bg-gray-300 pl-1" placeholder="Phone" />
                <label htmlFor="address">Address</label>
                <input type="text" name="address" id="address" className="w-full bg-gray-300 pl-1 mb-5" placeholder="Address" />
            
                <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Proceed to Payment</button>            
            </form>
        </div>
    );
}
 
export default GuestInfo;