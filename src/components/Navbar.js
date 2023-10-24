import React from 'react';
import { Link } from 'react-router-dom';
import { isUserLogged } from '../services/authService';
import { Provider, defaultTheme, Button } from '@adobe/react-spectrum';

function Navbar() {
  const is_logged_in = isUserLogged() === 'true';
  return (
    <Provider theme={defaultTheme}>
      <nav>
        {is_logged_in ? (
          <>
            <Button variant="primary"><Link to="/">Home</Link></Button>
            <Button variant="primary"><Link to="/teams">Areas</Link></Button>
            <Button variant="primary"><Link to="/employees">Employees</Link></Button>
            <Button variant="primary"><Link to="/logout">Logout</Link></Button>
          </>
        ) : (
          <Button variant="primary"><Link to="/login">Login</Link></Button>
        )}
      </nav>
    </Provider>
  );
}

export default Navbar;
