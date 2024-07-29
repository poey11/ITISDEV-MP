
import './App.css';
import Home from './Pages/Home.js';
import GuestInfo from './Pages/GuestInfo.js';
import PickARoom from './Pages/PickARoom.js';
import Payment from './Pages/Payment.js';
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
          </Routes>
        </Router>
    </div>
  );
}

export default App;
