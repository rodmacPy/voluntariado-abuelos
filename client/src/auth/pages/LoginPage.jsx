import axios from 'axios';
import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Navbar } from '../../ui';
import { AuthContext } from '../context';
import './Login_Register.css';
import 'animate.css';
export const LoginPage = () => {
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()
    const loginRef = useRef(null);
    const registerRef = useRef(null);
    const btnRef = useRef(null);

    const [loginData, setLoginData] = useState({
        correo: '',
        password: ''
    });

    const [user, setUser] = useState({
        nombre: '',
        correo: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    function register() {
        loginRef.current.style.left = "-400px";
        registerRef.current.style.left = "50px";
        btnRef.current.style.left = "110px";
    }

    function loginStyle() {
        loginRef.current.style.left = "50px";
        registerRef.current.style.left = "450px";
        btnRef.current.style.left = "0px";
    }

    // Esta función actualiza el estado del formulario de inicio de sesión cuando cambian los valores de los campos del formulario
    const handleChangeLogin = (event) => {
        const { name, value } = event.target;
        setLoginData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmitLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8080/api/auth/login",
                loginData
            );
            console.log(response)
            const { token } = response.data;
            const { nombre } = response.data.usuario
            // Guardar el token en el almacenamiento local del navegador

            // Establecer el token en la cabecera de autorización de Axios
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            // Iniciar sesión del usuario en la aplicación
            login(nombre, token);
            // Redirigir al usuario a la página principal
            // navigate('/', {
            //     replace: true
            // });
        } catch (error) {
            console.log('error', error);
        }
    };

    const handleChangeRegister = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };
    const handleSubmitRegister = async(e) => {
        e.preventDefault();
        const newErrors = validateForm(user);
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            console.log('User registered:', user);
        }

        try {
            const response = await axios.post('http://localhost:8080/api/usuarios', user)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    };

    const validateForm = ({ nombre, correo, password }) => {
        const errors = {};

        if (!/^[a-zA-Z]+$/i.test(nombre)) {
            errors.nombre = 'Only Characters are allowed';
        }

        if (password.length < 6) {
            errors.password = 'Password should have at least 6 Characters';
        }

        if (!correo.includes('@')) {
            errors.correo = 'Invalid correo address';
        }

        return errors;
    };

    return (
        <>
            <Navbar />
            <section>

                <div id="login-form" className="login-page animate__animated animate__fadeInLeft">
                    <div className="form-box">
                        <div className="button-box">
                            <div id='btn' ref={btnRef}></div>
                            <button className='toggle-btn' onClick={() => loginStyle()}>Acceso</button>
                            <button className='toggle-btn' onClick={() => register()}>Registro</button>
                        </div>


                        <form id="login" className="input-group-login animate__animated animate__fadeInLeft" onSubmit={handleSubmitLogin} ref={loginRef}>
                            <input
                                type="correo"
                                className="input-field"
                                placeholder="Email"
                                name="correo"
                                value={loginData.correo}
                                onChange={handleChangeLogin}
                                required
                            />
                            <input
                                type="text"
                                className="input-field"
                                placeholder="Password"
                                name="password"
                                value={loginData.password}
                                onChange={handleChangeLogin}
                                required
                            />
                            <button type="submit" className="submit-btn">
                                Acceso
                            </button>
                            <br />

                            <div className="forgot center">
                                <a href="#">¿Has olvidado tu contraseña?</a>
                            </div>

                            <br />
                            <p className='center'>
                                ¿Nuevo usuario? Registrate.
                            </p>
                        </form>


                        <form id="register" className="input-group-register" onSubmit={handleSubmitRegister} ref={registerRef}>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="Nombre"
                                name="nombre"
                                value={user.nombre}
                                onChange={handleChangeRegister}
                                required
                            />
                            {errors.nombre && <div className="error-message">{errors.nombre}</div>}
                            <input
                                type="correo"
                                className="input-field"
                                placeholder="Email"
                                name="correo"
                                value={user.correo}
                                onChange={handleChangeRegister}
                                required
                            />
                            {errors.correo && <div className="error-message">{errors.correo}</div>}
                            <input
                                type="password"
                                className="input-field"
                                placeholder="Password"
                                name="password"
                                value={user.password}
                                onChange={handleChangeRegister}
                                required
                            />
                            {errors.password && <div className="error-message">{errors.password}</div>}
                            <button type="submit" className="submit-btn">
                                Registro
                            </button>
                            <div className="toggle-text">
                                ¿Ya tienes una cuenta?{' '}
                                <span className="toggle-link">
                                    Acceso
                                </span>
                            </div>
                        </form>
                    </div>
                </div>



                <div className="imgL1">
                    <img className="animate__animated animate__fadeInLeft" src="../../../assets/ilustracion-concepto-voluntariado.png" alt="L1" />
                    
                </div>
            </section>
        </>
    );
}

