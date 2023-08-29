import { Route, Routes } from 'react-router-dom';
import './App.css';
import Display from './components/Display';
import Navbar from './components/NavBar';
function App() {
  return (
    <div className='App'>
      < Navbar />
      <Routes>
        <Route exact path='/' element={<Display />} />
      </Routes>
    </div>
  );
}

export default App;
