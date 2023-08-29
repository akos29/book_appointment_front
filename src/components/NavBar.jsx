import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <>
    <nav className="nav-cont">
      <h2>Yatch</h2>
      <ul>
        <li className="nav-item">
          <NavLink to="/" activeClassName="active" className="nav-item">Yatchs</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="#" activeClassName="active">ADD Booking</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="#" activeClassName="active">Reservation</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="#" activeClassName="active">ADD Yatch</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="#" activeClassName="active">DELETE Yatch</NavLink>
        </li>
      </ul>
    </nav>
  </>
);

export default Navbar;
