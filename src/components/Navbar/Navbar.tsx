import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    return (
        <nav>
            <div className="navbar-container">
                <img src="https://quind.io/wp-content/uploads/2022/01/Logo-Quind-web-01-600x393.png" alt="logo" className="logo" />


                <ul className="menu-items">
                    {isLoggedIn ? (
                        <>
                            <li>
                                <Link to="/home">HOME</Link>
                            </li>
                            <li>
                                <Link to="/team">TEAMS</Link>
                            </li>
                            <li>
                                <Link to="/employees">EMPLOYEES</Link>
                            </li>
                            <li>
                                <Link to="/logout">Log out</Link>
                            </li>
                        </>
                    ) : (
                        <li>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
