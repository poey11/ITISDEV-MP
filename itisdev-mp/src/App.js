
import './App.css';
import Home from './Pages/Home.js';
import GuestInfo from './Pages/GuestInfo.js';
import PickARoom from './Pages/PickARoom.js';
import Payment from './Pages/Payment.js';
import Feedback from './Pages/Feedback.js';

import CheckoutVerification from './Pages/CheckoutVerification.js';
import CheckoutAdditionalCharges from './Pages/CheckoutAdditionalCharges.js';
import CheckInPage from './Pages/CheckInPage';
import CheckInSuccessPage from './Pages/CheckInSuccessPage';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <h1 className ='text-3xl text-center'> ITISDEV MP - Hotel Check In/Out </h1>  
        <Router>
          <Routes>
            <Route path="/" Component={Home} />
            <Route path='/guestinfo' Component={GuestInfo} />
            <Route path='/rooms' Component={PickARoom} />
            <Route path='/payment' Component={Payment} />
            <Route path ='/feedback' Component={Feedback} />
            <Route path='/CheckoutVerification' Component={CheckoutVerification} />
            <Route path='/CheckoutAdditionalCharges' Component={CheckoutAdditionalCharges} />
            <Route path='/checkin' Component={CheckInPage } />
            <Route path='/checkin-success' Component={CheckInSuccessPage } />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
