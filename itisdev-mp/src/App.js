
import './App.css';
import BookPage from './Pages/BookPage.js';
import GuestInfo from './Pages/GuestInfo.js';
import PickARoom from './Pages/PickARoom.js';
import Payment from './Pages/Payment.js';
import Feedback from './Pages/Feedback.js';
import StartingPage from './Pages/StartingPage.js';
import CheckoutVerification from './Pages/CheckoutVerification.js';
import CheckoutAdditionalCharges from './Pages/CheckoutAdditionalCharges.js';
import CheckInPage from './Pages/CheckInPage';
import MainMenu from './Pages/MainMenu.js';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path="/" Component={StartingPage} />
            <Route path="/mainmenu" Component={MainMenu} />
            <Route path="/walkin" Component={BookPage} />
            <Route path='/guestinfo' Component={GuestInfo} />
            <Route path='/rooms' Component={PickARoom} />
            <Route path='/payment' Component={Payment} />
            <Route path ='/feedback' Component={Feedback} />
            <Route path='/checkout' Component={CheckoutVerification} />
            <Route path='/checkoutWCharges' Component={CheckoutAdditionalCharges} />
            <Route path='/checkin' Component={CheckInPage } />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
