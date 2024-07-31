
import './App.css';
import Home from './Pages/Home.js';
import GuestInfo from './Pages/GuestInfo.js';
import PickARoom from './Pages/PickARoom.js';
import Payment from './Pages/Payment.js';
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
            <Route path='/checkin' element={<CheckInPage />} />
            <Route path='/checkin-success' element={<CheckInSuccessPage />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
