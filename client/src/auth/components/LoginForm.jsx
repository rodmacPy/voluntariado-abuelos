import React, { useState } from 'react';

export const LoginForm = ({ handleToggle, loginRef}) => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLoginData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Login Data:', loginData);
    };

    return (
        <form id="login" className="input-group-login" onSubmit={handleSubmit} ref={loginRef}>
            <input
                type="email"
                className="input-field"
                placeholder="Email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                className="input-field"
                placeholder="Password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                required
            />
            <button type="submit" className="submit-btn">
                Login
            </button>
            <br />
            <center>
                <div className="forgot">
                    <a href="forgot.php">Forgot Password ?</a>
                </div>
            </center>
            <br />
            <p>
                <center>
                    New User ? Then{' '}
                    <button type="button" className="link-btn" onClick={handleToggle}>
                        Register !
                    </button>
                </center>
            </p>
        </form>
    );
}
