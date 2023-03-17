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
                        <h2 class="animate__animated animate__fadeInLeft">Abuelos en Comunidad</h2>
                    </Link>
                </div>
                <ul className="links">
                <li>
                        <NavLink
                            to="/"
                        >
                            <h4 class="animate__animated animate__fadeInLeft">Inicio</h4>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/products"
                        >
                            <h4 class="animate__animated animate__fadeInLeft">Voluntarios</h4>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/services"
                        >
                            <h4 class="animate__animated animate__fadeInLeft">Actividades</h4>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/about"
                        >
                            <h4 class="animate__animated animate__fadeInLeft">Sobre Nosotros</h4>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/contact"
                        >
                            <h4 class="animate__animated animate__fadeInLeft">Contacto</h4>
                        </NavLink>
                    </li>
                </ul>

                {(!logged) ?
                    <Link
                        className='action_btn'
                        to="/login"
                    >
                        Acceso
                    </Link>
                    : <li>
                        <Link
                            className='action_btn'
                            to="/profile"
                        >
                            <h4 class="animate__animated animate__fadeInLeft">Perfil</h4>
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