import "../Styling/styles.css";

const About = ({ onClose }) => {
    return (  
        <div id="about-popup" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="popup-container relative p-8 rounded-lg" style={{ backgroundColor: '#333', color: '#fff' }}>
                <button style={{ paddingRight: '15px', color: '#994a1d' }} className="absolute top-2 right-2 text-white" onClick={onClose}>X</button>
                <h2 style={{ fontWeight: 'bolder' }} className="text-2xl mb-4">About Us</h2>
                <p>Welcome to Hotel Manila, where comfort meets luxury in the heart of Manila. Our hotel offers a blend of modern amenities and traditional hospitality to make your stay unforgettable. Whether you're here for business or leisure, our dedicated team is committed to providing exceptional service and ensuring a memorable experience. Explore the vibrant city of Manila while enjoying the tranquility of our elegant accommodations.</p>
            </div>
        </div>
    );
}

export default About;
