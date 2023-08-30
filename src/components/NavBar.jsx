import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <>
    <nav className="nav-cont">
      <h2>Yatch</h2>
      <ul>
        <li className="nav-item">
          <NavLink to="/"  active className="nav-item">Yatchs</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/add_reservation" >ADD Reservation</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/reservation" >My Reservation</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/add_yatch" >ADD Yatch</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/delete_yatch" >DELETE Yatch</NavLink>
        </li>
      </ul>
    </nav>
  </>
);

export default Navbar;
