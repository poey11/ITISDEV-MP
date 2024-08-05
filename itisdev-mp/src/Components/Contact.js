import "../Styling/styles.css";

const Contact = ({ onClose }) => {
    return ( 
        <div id="contact-popup" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="popup-container relative p-8 rounded-lg" style={{ backgroundColor: '#333', color: '#fff' }}>
                <button style={{ paddingRight: '15px', color: '#994a1d' }} className="absolute top-2 right-2 text-white" onClick={onClose}>X</button>
                <h2 style={{ fontWeight: 'bolder' }} className="text-2xl mb-4">Contact Us</h2>
                <p>For inquiries or reservations, please reach out to us:</p>
                <p><strong>Address:</strong> Hotel Manila, Manila, PH</p>
                <p><strong>Phone:</strong> +63 9120328432</p>
                <p><strong>Email:</strong> <a href="mailto:info@hotel.com">info@hotelManila.com</a></p>
            </div>
        </div>    
    );
}

export default Contact;
