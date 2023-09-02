import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Nav';
import Protected from './components/ProtectedRoute';
import Home from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import AddYacht from './components/AddYacht';

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
                <AddYacht />
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
