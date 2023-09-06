import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/auth/authSlice';
import ReservationForm from './reservation/ReservationForm';

function Navbar() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Mobile View Nav */}
      <nav className='mobile-navbar z-[9999]'>
        <h3 className='ml-3 font-bold'>YoYachts</h3>

        <button
          type='button'
          className='rounded-sm border-gray-200 border-2 p-1 flex flex-col gap-1 mr-3'
          onClick={() => setMobileNavOpen(true)}
        >
          <span className='inline-block w-5 h-0.5 bg-slate-500' />
          <span className='inline-block w-5 h-0.5 bg-slate-500' />
          <span className='inline-block w-5 h-0.5 bg-slate-500' />
        </button>

        <ul
          className={`${
            mobileNavOpen ? 'flex' : 'hidden '
          } fixed top-0 left-0 w-full min-h-screen bg-gray-100 z-[9999] flex-col gap-y-7 pb-6 pt-3`}
        >
          <li className='my-2 text-right flex justify-end'>
            <button
              type='button'
              className='rounded-sm border-gray-300 border-2 p-3 flex flex-col gap-0 mr-3 w-8 h-8 items-center justify-center'
              onClick={() => setMobileNavOpen(false)}
            >
              <span className='inline-block w-5 h-0.5 bg-slate-500 rotate-45 translate-y-0.5' />
              <span className='inline-block w-5 h-0.5 bg-slate-500 -rotate-45' />
            </button>
          </li>
          <li className='nav-item'>
            <NavLink to='/' onClick={() => setMobileNavOpen(false)}>
              Yachts
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/reservations' onClick={() => setMobileNavOpen(false)}>
              My Reservations
            </NavLink>
          </li>
          <li className='nav-item'>
            <button
              onClick={() => {
                setMobileNavOpen(false);
                openModal();
              }}
              type='button'
            >
              Add Reservation
            </button>
          </li>
          <li className='nav-item'>
            <NavLink to='/add_yacht' onClick={() => setMobileNavOpen(false)}>
              Add Yacht
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/delete_yacht' onClick={() => setMobileNavOpen(false)}>
              Delete Yacht
            </NavLink>
          </li>
          {isAuthenticated ? (
            <li>
              <button
                type='button'
                onClick={() => dispatch(logout())}
                className='text-red-600 font-semibold inline-flex items-center justify-center bg-red-100 px-10 py-3 rounded-md shadow-sm'
              >
                Logout
              </button>
            </li>
          ) : null}
        </ul>
      </nav>

      {/* Desktop View Nav */}
      <nav className='nav-cont sticky top-0 left-0 min-h-screen hidden md:flex'>
        <h2>Yacht</h2>
        <ul>
          <li className='nav-item'>
            <NavLink to='/'>Yachts</NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/reservations'>My Reservations</NavLink>
          </li>
          <li className='nav-item'>
            <button onClick={openModal} type='button'>
              Add Reservation
            </button>
          </li>
          <li className='nav-item'>
            <NavLink to='/add_yacht'>Add Yacht</NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/delete_yacht'>Delete Yacht</NavLink>
          </li>
          {isAuthenticated ? (
            <li>
              <button
                type='button'
                onClick={() => dispatch(logout())}
                className='text-red-600 font-normal inline-flex items-center justify-center bg-red-50 px-8 py-2 rounded-md shadow-sm hover:shadow-md'
              >
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
                type='button'
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
    </>
  );
}

export default Navbar;
