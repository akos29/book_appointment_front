import { Route, Routes } from 'react-router-dom';
import './App.css';
import Display from './components/Display';
import Navbar from './components/Navbar';
import ReservationsList from './components/reservation/ReservationList';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <div className='details'>
        <Routes>
          <Route exact path='/' element={<Display />} />
          <Route exact path='/login' element={<Display />} />
          <Route exact path='/reservations' element={<ReservationsList />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
