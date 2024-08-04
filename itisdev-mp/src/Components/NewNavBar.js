import { useNavigate } from "react-router-dom";

import "../Styling/styles.css";
import { useState } from 'react';
import About from './About';
import Contact from './Contact';

const NewNavBar = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [signalType, setSignalType] = useState('');

    const gotoIdle = () => {
        navigate('/');
    }

    const handlePopUp = (type) => {
        setSignalType(type);
        setIsVisible(true);

    }

    const handleClose = () => {
        setIsVisible(false);
    }

    return (
        <>  
            <header id="navbar" className="p-4 shadow-lg">
                <div className="flex justify-center space-x-8">
                   
                    <p className="text-gray-300 hover:text-[#D3836] cursor-pointer" onClick={gotoIdle}>Home</p>
                    <p  id="about-link" className="text-gray-300 hover:text-[#D3836] cursor-pointer" onClick={() => handlePopUp('about')}>About Us</p>
                    <p id="contact-link" className="text-gray-300 hover:text-[#D3836] cursor-pointer" onClick={() => handlePopUp('contact')}>Contact Us</p>
                </div>
                {isVisible && signalType === 'about' && <About isVisible={isVisible} onClose={handleClose} />}
                {isVisible && signalType === 'contact' && <Contact isVisible={isVisible} onClose={handleClose} />}
            </header> 
        </>
    );
}
 
export default NewNavBar;