import { useNavigate } from "react-router-dom"; 


const Room = (details) => {
    
    const Title = details.roomTitle;
    const Price = details.roomPrice;
    const Description = details.roomDescription;
    const ReservationData = details.reservationData;
    // const Image = details.roomImage;
    const navigate = useNavigate();
    const handleSubmit=(e)=>{
        e.preventDefault();
       navigate('/guestinfo', {state: {reservationData: ReservationData, roomTitle: Title, roomPrice: Price}});
    }

    return ( 
        <div>
           <form key={Title} className="w-80 p-4" onSubmit={handleSubmit} >
               <div className="border border-gray-300 rounded-lg p-4 bg-gray-200">
                   <h2 className="text-lg font-semibold">{Title}</h2>
                   <p className="text-sm text-gray-600">${Price} per night</p>
                   <p className="text-sm">{Description}</p>
                   <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Reserve</button>
               </div>
           </form>   
        </div>
    );
}
 
export default Room;