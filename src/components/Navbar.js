import React from 'react';
import { Link } from 'react-router-dom';
import { isUserLogged } from '../services/authService';

function Navbar() {
  const is_logged_in = isUserLogged() === 'true';  // Convertir a boolean
  return (
    <nav>
      {is_logged_in ? (
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/teams">Areas</Link>
          </li>
          <li>
            <Link to="/employees">Employees</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
