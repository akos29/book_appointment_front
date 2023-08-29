/* eslint-disable import/extensions */
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Protected from './components/ProtectedRoute';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <div>
        <Routes>
          <Route
            exact
            path='/'
            element={
              <Protected>
                <Home />
              </Protected>
            }
          />
          <Route path='/home' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route
            path='*'
            element={
              <h2 className='text-red-500 font-semibold'>Page not found!</h2>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
