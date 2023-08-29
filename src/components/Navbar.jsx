import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/auth/authSlice';

function Navbar() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='login'>Login</Link>
          </li>
          <li>
            <Link to='register'>Register</Link>
          </li>
          <li>
            {isAuthenticated ? (
              <>
                <b>{user.name} </b>
                <button
                  type='button'
                  className='text-red-400'
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </button>
              </>
            ) : null}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
