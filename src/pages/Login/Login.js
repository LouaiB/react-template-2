import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import UserService from '../../services/user.service';
import TokenStorageHelper from '../../storage/token.storage';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../context/user.context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import './Login.sass';

export default function Login() {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { user, setUser } = useContext(UserContext);

    const { handleSubmit, register, errors } = useForm();
    const history = useHistory();
    
    const onSubmit = values => {
        setIsLoading(true);
        UserService.login(values.username, values.password).then(response => {
            const accessToken = response.data.accessToken;
            const refreshToken = response.data.refreshToken;

            TokenStorageHelper.setAccessToken(accessToken);
            TokenStorageHelper.setRefreshToken(refreshToken);

            UserService.getUserData().then(userData => {
                setUser({
                    loggedIn: true,
                    ... userData.data
                });
    
                setIsLoading(false);
                history.push('/');
            }).catch(err2 => {
                setIsLoading(false);
                console.error(err2);
                setError(err2.error.message);
            });
        }).catch(err => {
            setIsLoading(false);
            console.error(err);
            if(err.response) setError(err.response.data.message);
        });
    }

    return (
        <div className="login-page">
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                <label>username:</label>
                <input
                    name="username"
                    ref={register({
                        required: "username required",
                        minLength: 3,
                        // pattern: {
                        //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        //     message: "invalid email address"
                        // }
                    })}
                />
                {errors.username && errors.username.message && <span className="error">{errors.username.message}</span>}
                {errors.username && errors.username.type == "minLength" && <span className="error">username must be at least 3 characters</span>}

                <label>password:</label>
                <input
                    name="password"
                    type="password"
                    ref={register({
                        required: "password required",
                        minLength: 3,   
                        //validate: value => value !== "admin" || "Nice try!"
                    })}
                />
                {errors.password && errors.password.message && <span className="error">{errors.password.message}</span>}
                {errors.password && errors.password.type == "minLength" && <span className="error">password must be at least 3 characters</span>}

                {error && <span className="error">{error}</span>}
                {isLoading && <FontAwesomeIcon icon={faSpinner} className="spin" />}
                <button type="submit" disabled={isLoading}>Login</button>
            </form>
        </div>
    )
}
