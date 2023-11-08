import React from 'react'
import { logout } from '../../redux/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import './Header.css';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { resetState } from '../../redux/actions/userActions';

function Header() {

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const currentUser = useSelector((state) => state.auth.currentUser);
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.clear();
        dispatch(logout());
        // Redirect to login or update the app state accordingly
    };

    var className = isAuthenticated ? 'header-logout' : 'header-hide-logout';
    var headers = (currentUser != null && currentUser.user.role === 1) ? '' : 'header-hide-admin';

    const redirectToUserList = () => {
        window.location.href="/userlist";
    }

    const redirectToCreateNewUser = () => {
        window.location.href="/createuser";
        dispatch(resetState())
    }

    return (
        <div className='header'>
            <h1 className='logo'><Link to="/">Web Application</Link></h1>
            <ul className="main-nav">
                <li onClick={redirectToUserList} className={headers}><a href='/userlist'>User list</a></li>
                <li onClick={redirectToCreateNewUser} className={headers}><a href='/createuser'>Add New User</a></li>
                <li className={className} onClick={handleLogout}><a href="#"><Button type='primary'>Logout</Button></a></li>
            </ul>
        </div>
    )
}

export default Header