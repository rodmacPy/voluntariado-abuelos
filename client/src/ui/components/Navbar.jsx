import { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth';


export const Navbar = () => {
    const { logout, logged } = useContext(AuthContext)
    const navigation = useNavigate()

    const [isActive, setIsActive] = useState(false);

    const handleClick = event => {
        // 👇️ toggle isActive state on click
        setIsActive(current => !current);
    };

    const onLogout = () => {
        logout()
        navigation('/login', {
            replace: true
        });
    }
    return (
        <header>
            <nav className='navbar'>
                <div className='hero-div'>
                    <Link
                        to="/"
                    >
                        <h2 className="animate__animated animate__backInLeft">Abuelos en Comunidad</h2>
                    </Link>
                </div>
                <ul className="links class animate__animated animate__backInLeft">
                    <li>
                        <NavLink
                            to="/"
                        >
                            INICIO
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/about"
                        >
                            ACERCA DE
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/volunteers"
                        >
                            VOLUNTARIOS
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/activities"
                        >
                            ACTIVIDADES
                        </NavLink>
                    </li>
                    
                    <li>
                        <NavLink
                            to="/contact"
                        >
                            CONTACTO
                        </NavLink>
                    </li>
                </ul>

                {(!logged) ?
                    <Link
                        className='action_btn animate__animated animate__backInLeft'
                        to="/login"
                    >
                        LOGIN
                    </Link>
                    : <li>
                        <Link
                            className='action_btn'
                            to="/profile"
                        >
                            <span className="animate__animated animate__backInLeft">Perfil</span>
                        </Link>
                    </li>}


                <div className='toggle_btn' onClick={handleClick}>
                    <i className={isActive ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'}></i>
                </div>
            </nav>

            <div className={isActive ? 'dropdown_menu open' : 'dropdown_menu'} >
                <li>
                    <NavLink
                        to="/"
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/about"
                    >
                        About
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/services"
                    >
                        Services
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/contact"
                    >
                        Contact
                    </NavLink>
                </li>
                <li>
                    <Link
                        className='action_btn'
                        to="/login"
                    >
                        Login
                    </Link>
                </li>
                <li>
                    <Link
                        className='action_btn'
                        to="/login"
                    >
                        Profile
                    </Link>
                </li>
            </div>
        </header>
    )
}