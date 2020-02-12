import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import authContext from '../context/authContext';

const NavBar = () => {
    const { isAuthenticated, login, logout } = useContext(authContext);

    return (
        <div>
            {!isAuthenticated && (
                <button onClick={() => login({})}>Log in</button>
            )}

            {isAuthenticated && <button onClick={() => logout()}>Log out</button>}

            {isAuthenticated && (
                <span>
                    <Link to="/">Home</Link>&nbsp;
                    <Link to="/profile">Profile</Link>&nbsp;
                    <Link to="/drivers">Drivers</Link>
                </span>
            )}
        </div>
    );
};

export default NavBar;