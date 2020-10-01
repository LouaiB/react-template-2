import React, { useContext } from 'react'
import ThemePicker from '../ThemePicker/ThemePicker';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/user.context';
import './Header.sass';
import logo from '../../assets/logo.png';

export default function Header() {
    
    const { user } = useContext(UserContext);
    
    return (
        <div className="header">
            <div className="logo">
                <img className="logo-img" src={logo} />
            </div>
            <ThemePicker />
            <div className="nav">
                { !user.loggedIn && <>
                    <Link className="link" to="/login">Login</Link>
                    <Link className="link" to="/register">Register</Link>
                </> }
                { user.loggedIn && <>
                    <Link className="link" to="/logout">Logout</Link>
                </> }
            </div>
        </div>
    )
}
