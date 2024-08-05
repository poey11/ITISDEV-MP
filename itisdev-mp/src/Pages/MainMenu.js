import "../Styling/styles.css";
import { useNavigate } from "react-router-dom";
import NavBar from '../Components/NewNavBar';
import Footer from '../Components/Footer';

const MainMenu = () => {
    const navigate = useNavigate();
    const gotoBookPage = () => {
        navigate('/book');
    }
    const gotoCheckIn = () => {
        navigate('/checkin');
    }
    const gotoCheckOut = () => {
        navigate('/checkout');
    }
    const gotoWalkin = () => {
        navigate('/walkin');
    }
    return (  
        <body className="min-h-screen flex flex-col">
            <NavBar />
             <main className="flex-grow flex flex-col items-center justify-center text-center space-y-4">
                <div className="container2">
                    <button className="bg-[#667572] text-white hover:text-[#C87941] font-bold py-2 px-4 rounded transition-colors duration-300" onClick={gotoBookPage}> Book a Room</button>
                    <button className="bg-[#667572] hover:bg-[#24343B] text-white font-bold py-2 px-4 rounded transition-colors duration-300 ml-1"onClick={gotoWalkin}>Walk In</button>
                    <button className="bg-[#667572] hover:bg-[#24343B] text-white font-bold py-2 px-4 rounded transition-colors duration-300 ml-1" onClick={gotoCheckIn}>Check In</button>
                    <button className="bg-[#667572] hover:bg-[#24343B] text-white font-bold py-2 px-4 rounded transition-colors duration-300 ml-1"onClick={gotoCheckOut}>Check Out</button>
                </div>
            </main>
            <Footer />
        </body>

    );
}
 
export default MainMenu;

