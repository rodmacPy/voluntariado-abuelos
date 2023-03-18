import React, { useState } from 'react';

export const RegisterForm = ({ handleToggle, registerRef }) => {
    const [user, setUser] = useState({
        firstname: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm(user);
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            console.log('User registered:', user);
        }
    };

    const validateForm = ({ firstname, email, password }) => {
        const errors = {};

        if (!/^[a-zA-Z]+$/i.test(firstname)) {
            errors.firstname = 'Only Characters are allowed';
        }

        if (password.length < 6) {
            errors.password = 'Password should have at least 6 Characters';
        }

        if (!email.includes('@')) {
            errors.email = 'Invalid email address';
        }

        return errors;
    };

    return (
        <form id="register" className="input-group-register" onSubmit={handleSubmit} ref={registerRef}>
            <input
                type="text"
                className="input-field"
                placeholder="Firstname"
                name="firstname"
                value={user.firstname}
                onChange={handleChange}
                required
            />
            {errors.firstname && <div className="error-message">{errors.firstname}</div>}
            <input
                type="email"
                className="input-field"
                placeholder="Email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
            <input
                type="password"
                className="input-field"
                placeholder="Password"
                name="password"
                value={user.password}
                onChange={handleChange}
                required
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
            <button type="submit" className="submit-btn">
                Registro
            </button>
            <div className="toggle-text">
                ¿Ya tienes una cuenta?{' '}
                <span className="toggle-link" onClick={handleToggle}>
                    Acceso
                </span>
            </div>
        </form>
    );
}
