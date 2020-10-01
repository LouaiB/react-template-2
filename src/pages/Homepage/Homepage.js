import React, { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import './Homepage.sass';

export default function Homepage() {

    const { user } = useContext(UserContext);

    return (
        <div className="homepage">
            <h1>Homepage</h1>
            <p>Welcome, {user.username}</p>
        </div>
    )
}
