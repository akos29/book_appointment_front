import { Route, Routes } from 'react-router-dom';
import './App.css';

import Display from './components/Display';
import Navbar from './components/NavBar';


function App() {
  return (
    <div className='App'>
      <Navbar />
      <div className='bar'>
        <Routes>
          <Route exact path='/' element={<Display />} />
          <Route exact path='/add_reservation' element={<Display />} />
          <Route exact path='/reservation' element={<Display />} />
          <Route exact path='/add_yatch' element={<Display />} />
          <Route exact path='/delete_yatch' element={<Display />} />

        </Routes>
      </div>
    </div>
  );
}

export default App;
