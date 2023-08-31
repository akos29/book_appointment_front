import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/auth/authSlice';

function Navbar() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <nav className='nav-cont'>
      <h2>Yatch</h2>
      <ul>
        <li className='nav-item'>
          <NavLink to='/' active className='nav-item'>
            Yatchs
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink to='/add_reservation'>Add Reservation</NavLink>
        </li>
        <li className='nav-item'>
          <NavLink to='/reservation'>My Reservation</NavLink>
        </li>
        <li className='nav-item'>
          <NavLink to='/add_yatch'>Add Yatch</NavLink>
        </li>
        <li className='nav-item'>
          <NavLink to='/delete_yatch'>Delete Yatch</NavLink>
        </li>
        {isAuthenticated ? (
          <li>
            <button type='button' onClick={() => dispatch(logout())}>
              Logout
            </button>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}

export default Navbar;