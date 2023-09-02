import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Display from './components/Display';
import ReservationsList from './components/reservation/ReservationList';
import Protected from './components/ProtectedRoute';
import Home from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import Nav from './components/Nav';
import 'react-toastify/dist/ReactToastify.css';
import Reserve from './components/reservation/Index';

function App() {
  return (
    <div className='App'>
      <Nav />
      <div className='details'>
        <Routes>
          <Route exact path='/' element={<Display />} />
          <Route exact path='/login' element={<Login />} />
          <Route
            exact
            path='/'
            element={
              <Protected>
                <Home />
              </Protected>
            }
          />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route
            path='/add_reservation'
            element={
              <Protected>
                <Reserve />
              </Protected>
            }
          />
          <Route
            path='/reservations'
            element={
              <Protected>
                <ReservationsList />
              </Protected>
            }
          />
          <Route
            path='/add_yatch'
            element={
              <Protected>
                <Home />
              </Protected>
            }
          />
          <Route
            path='/delete_yatch'
            element={
              <Protected>
                <Home />
              </Protected>
            }
          />
          <Route
            path='*'
            element={
              <h2 className='text-red-500 font-semibold'>Page not found!</h2>
            }
          />
        </Routes>
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
