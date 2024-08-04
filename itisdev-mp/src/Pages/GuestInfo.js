import { useNavigate } from "react-router-dom"; 
import { useLocation } from 'react-router-dom';
import NavBar from '../Components/NewNavBar';
import Footer from '../Components/Footer';


const GuestInfo = () => {
    const location = useLocation();
    const { state } = location;
    const { reservationData} = state || {};
    const navigate = useNavigate();
    const handleSubmit =  (e) => {
        e.preventDefault();
        const guestData = {
            title: document.getElementById('title').value,
            fullName: document.getElementById('firstName').value + ' ' + document.getElementById('lastName').value,
            gender: document.getElementById('gender').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
        }
        navigate('/payment', {state: {reservationData, guestData}});
    };

    return (  
        <body className="text-gray-300 min-h-screen flex flex-col justify-between">
            <NavBar />
            <main className="flex-grow">
                <div className="flex items-center justify-center h-full">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-xl font-semibold mb-5 text-center text-black">Guest Information</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label for5="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                                <select id="title" className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    <option>Mr</option>
                                    <option>Ms</option>
                                    <option>Mrs</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                                <input type="text" id="firstName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="First Name"/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                                <input type="text" id="lastName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Last Name"/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="gender" className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
                                <select id="gender" className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                                <input type="email" id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Email"/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
                                <input type="tel" id="phone" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Phone"/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                                <input type="text" id="address" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Address"/>
                            </div>
                            <div className="flex items-center justify-center h-full">
                                <button className="custom-btn text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                    Proceed to Payment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </body>
    );
}
 
export default GuestInfo;