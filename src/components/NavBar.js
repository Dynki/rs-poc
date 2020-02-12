import React from "react";
import { Link } from 'react-router-dom';
import { useAuth0 } from "../react-auth0-spa";

const NavBar = () => {
    const { isAuthenticated, loginWithPopup, logout } = useAuth0();

    return (
        <div>
            {!isAuthenticated && (
                <button onClick={() => loginWithPopup({})}>Log in</button>
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