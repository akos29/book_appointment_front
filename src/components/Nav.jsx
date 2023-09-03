import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/auth/authSlice';
import ReservationForm from './reservation/ReservationForm';

function Navbar() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <nav className='nav-cont'>
      <h2>Yacht</h2>
      <ul>
        <li className='nav-item'>
          <NavLink to='/' className='nav-item'>
            Yachts
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink to='/reservations' className='nav-item'>
            My Reservations
          </NavLink>
        </li>
        <li className='nav-item'>
          <button onClick={openModal}>Add Reservation</button>
        </li>
        <li className='nav-item'>
          <NavLink to='/add_yacht'>Add Yacht</NavLink>
        </li>
        <li className='nav-item'>
          <NavLink to='/delete_yacht'>Delete Yacht</NavLink>
        </li>
        {isAuthenticated ? (
          <li>
            <button type='button' onClick={() => dispatch(logout())}>
              Logout
            </button>
          </li>
        ) : null}
      </ul>

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          {/* Blurred background */}
          <div className='modal-overlay blur z-40 w-12 h-12' />
          <div className='modal-container z-50 w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-green-800 dark:border-gray-700'>
            <button
              className='absolute top-2 right-2 text-gray-500 hover:text-gray-800'
              onClick={closeModal}
            >
              Close
            </button>
            <ReservationForm handleClose={closeModal} />
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
