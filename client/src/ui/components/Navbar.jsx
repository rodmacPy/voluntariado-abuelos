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
                        <h2>Abuelos en Comunidad</h2>
                    </Link>
                </div>
                <ul className="links">
                <li>
                        <NavLink
                            to="/"
                        >
                            Inicio
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/products"
                        >
                            Voluntarios
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/services"
                        >
                            Actividades
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/about"
                        >
                            Sobre Nosotros
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/contact"
                        >
                            Contacto
                        </NavLink>
                    </li>
                </ul>

                {(!logged) ?
                    <Link
                        className='action_btn'
                        to="/login"
                    >
                        Login
                    </Link>
                    : <li>
                        <Link
                            className='action_btn'
                            to="/profile"
                        >
                            Perfil
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
        // <nav className="navbar navbar-expand-sm navbar-dark bg-success p-2">

        //     <Link
        //         className="navbar-brand"
        //         to="/"
        //     >
        //         Asociaciones
        //     </Link>

        //     <div className="navbar-collapse">
        //         <div className="navbar-nav">

        //             <NavLink
        //                 className="nav-item nav-link"
        //                 to="/marvel"
        //             >
        //                 Marvel
        //             </NavLink>

        //             <NavLink
        //                 className="nav-item nav-link"
        //                 to="/dc"
        //             >
        //                 DC
        //             </NavLink>

        //             <NavLink
        //                 className="nav-item nav-link"
        //                 to="/search"
        //             >
        //                 Search
        //             </NavLink>
        //         </div>
        //     </div>

        //     <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
        //         <ul className="navbar-nav ml-auto">
        //             <span className='nav-item nav-link text-black'>
        //                 {user && user.name}
        //             </span>
        //             <button
        //                 className='nav-item nav-link btn'
        //                 onClick={onLogout}
        //             >
        //                 Logout
        //             </button>
        //         </ul>
        //     </div>
        // </nav>
    )
}