import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Display from './components/Display';
import ReservationsList from './components/reservation/ReservationList';
import Protected from './components/ProtectedRoute';
import Home from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import AddYacht from './components/AddYacht';
import Nav from './components/Nav';
import DeleteYacht from './components/DeleteYacht';
import 'react-toastify/dist/ReactToastify.css';
import Reserve from './components/reservation/Index';

function App() {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('user', user)
  }, [user, dispatch]);

  return (
    <div className='App'>
      {user.isAuthenticated && <Nav />}
      { console.log(user.isAuthenticated)}
      <div className='details'>
        <Routes>
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
            path='/add_yacht'
            element={
              <Protected>
                <AddYacht />
              </Protected>
            }
          />
          <Route
            path='/delete_yacht'
            element={
              <Protected>
                <DeleteYacht />
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
