import Room from '../Components/Room';
import { useLocation } from 'react-router-dom';

const PickARoom = () => {
    const location = useLocation();
    const { state } = location;
    const { reservationData } = state || {}; 
    const rooms = [
        // Single Rooms
        {
          roomTitle: "Cozy Single Room",
          roomPrice: "70",
          roomDescription: "A comfortable single room with a twin bed, free Wi-Fi, a flat-screen TV, and a small work desk. Perfect for solo travelers.",
          roomType: "Single"
        },
        {
          roomTitle: "Budget Single Room",
          roomPrice: "50",
          roomDescription: "An economical option featuring a twin bed, complimentary Wi-Fi, a compact wardrobe, and a shared bathroom. Ideal for budget-conscious travelers.",
          roomType: "Single"
        },
        {
          roomTitle: "Standard Single Room",
          roomPrice: "60",
          roomDescription: "A well-appointed single room with a twin bed, a private bathroom, free Wi-Fi, and a small sitting area. Suitable for short stays.",
          roomType: "Single"
        },
      
        // Double Rooms
        {
          roomTitle: "Standard Double Room",
          roomPrice: "120",
          roomDescription: "A spacious room with a queen-size bed, private bathroom, free Wi-Fi, a flat-screen TV, and a work desk. Ideal for couples or business travelers.",
          roomType: "Double"
        },
        {
          roomTitle: "Deluxe Double Room",
          roomPrice: "150",
          roomDescription: "A beautifully decorated room featuring a king-size bed, a private balcony, free Wi-Fi, a mini-fridge, and a large flat-screen TV. Perfect for a romantic getaway.",
          roomType: "Double"
        },
        {
          roomTitle: "Twin Double Room",
          roomPrice: "130",
          roomDescription: "A comfortable room with two twin beds, a private bathroom, free Wi-Fi, a flat-screen TV, and a spacious work area. Great for friends or colleagues traveling together.",
          roomType: "Double"
        },
      
        // Suites
        {
          roomTitle: "Executive Suite",
          roomPrice: "250",
          roomDescription: "A luxurious suite with a king-size bed, a separate living area, free Wi-Fi, two flat-screen TVs, a minibar, and a large bathroom with a Jacuzzi. Perfect for business travelers or special occasions.",
          roomType: "Suite"
        },
        {
          roomTitle: "Family Suite",
          roomPrice: "300",
          roomDescription: "A spacious suite with a master bedroom, a second bedroom with twin beds, a separate living room, free Wi-Fi, a kitchenette, and a large bathroom. Ideal for families.",
          roomType: "Suite"
        },
        {
          roomTitle: "Junior Suite",
          roomPrice: "200",
          roomDescription: "An elegant suite with a queen-size bed, a cozy living area, free Wi-Fi, a flat-screen TV, a minibar, and a spacious bathroom. Suitable for extended stays or couples.",
          roomType: "Suite"
        },
      
        // Luxury Rooms
        {
          roomTitle: "Presidential Luxury Suite",
          roomPrice: "500",
          roomDescription: "The epitome of luxury with a king-size bed, a grand living room, free Wi-Fi, three flat-screen TVs, a private dining area, a full kitchen, and a large bathroom with a Jacuzzi. Perfect for VIP guests.",
          roomType: "Luxury"
        },
        {
          roomTitle: "Royal Luxury Suite",
          roomPrice: "450",
          roomDescription: "An opulent suite with a king-size bed, a separate lounge area, free Wi-Fi, two flat-screen TVs, a minibar, and a marble bathroom with a Jacuzzi. Ideal for those seeking top-tier comfort.",
          roomType: "Luxury"
        },
        {
          roomTitle: "Penthouse Luxury Suite",
          roomPrice: "600",
          roomDescription: "A lavish suite on the top floor with panoramic city views, a king-size bed, a large living room, free Wi-Fi, three flat-screen TVs, a private terrace, a full kitchen, and a luxurious bathroom with a Jacuzzi. Suitable for ultimate luxury experiences.",
          roomType: "Luxury"
        }
      ];

    return (  
        <div>
            <h1 className="text-2xl text-center">Select Your {reservationData.roomType} Room</h1>
            <div className="flex flex-col items-center">
                {rooms.filter((room) => room.roomType === reservationData.roomType)
                .map((room, index) => (
                    <Room key={index} roomTitle={room.roomTitle} 
                      roomPrice={room.roomPrice}
                      roomDescription={room.roomDescription} 
                      reservationData={reservationData}
                     />
                ))}
            </div>
        </div>
    );
}
 
export default PickARoom;
