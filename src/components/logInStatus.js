import React from 'react';

import { Link } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
export default function LogInStatus(){
    const { isLoggedIn, login, logout } = useAuth();
    return (
        <div className="logInStatus">
            <p>{isLoggedIn ? 'Logged In' : 'Logged Out'}</p>
            <Link to={'/login'}>
                <p>Login</p>
            </Link>
            <Link to={'/signup'}>
                <p>Sign up</p>
            </Link>
            <p onClick={login} style={{ cursor: 'pointer', textDecoration: 'underline' }}>Login</p>
            <p onClick={logout} style={{ cursor: 'pointer', textDecoration: 'underline' }}>Logout</p>

        </div>
    )
}