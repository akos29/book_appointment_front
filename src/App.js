import { Route, Routes } from 'react-router-dom';
import './App.css';
import Display from './components/Display';
import ReservationsList from './components/reservation/ReservationList';
import Protected from './components/ProtectedRoute';
import Home from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import Nav from './components/Nav';

function App() {
  return (
    <div className='App'>
      <Nav />
      <div className='details'>
        <Routes>
          <Route exact path='/' element={<Display />} />
          <Route exact path='/login' element={<Display />} />
          <Route exact path='/reservations' element={<ReservationsList />} />
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
                <Home />
              </Protected>
            }
          />
          <Route
            path='/reservation'
            element={
              <Protected>
                <Home />
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
      </div>
    </div>
  );
}

export default App;
