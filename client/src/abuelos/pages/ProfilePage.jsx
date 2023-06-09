import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth';
import { getDatosAuth } from '../helpers/getDatosAuth';
import '../Styles/ProfilePage.css'

export const ProfilePage = () => {
    const navigate = useNavigate()
    const { logout, logged } = useContext(AuthContext)
    const { data } = getDatosAuth()
    const onLogout = () => {
        logout()
        navigate('/login', {
            replace: true
        });
    }
 
    return (
        <div className='profile-container'>
            <div className='profile-navbar'>
                <div className='profile-card'>
                    <div className='img'>
                        <img src={`http://localhost:8080/api/uploads/usuarios/${data?.uid}`} alt="" />
                    </div>
                    <p>{data?.nombre}</p>
                    <p>{data?.correo}</p>
                </div>
                <div className='profile-links'>
                    <h3>Panel de Usuario</h3>

                    <NavLink
                        to="update"
                    >
                        Actualizar Datos
                    </NavLink>
                    <NavLink
                        to="updateimage"
                    >
                        Actualizar Imagen
                    </NavLink>

                    <button className='button-link' onClick={onLogout}>
                        Cerrar Sesion
                    </button>
                </div>

                <div className='profile-links'>
                    <h3>Panel de Administrador</h3>
                    <NavLink
                        to="actividades"
                    >
                        Actividades
                    </NavLink>
                    <NavLink
                        to="abuelos"
                    >
                        Abuelos
                    </NavLink>
                    <NavLink
                        to="usuarios"
                    >
                        Usuarios
                    </NavLink>
                    <NavLink
                        to="roles"
                    >
                        Roles
                    </NavLink>
                </div>
            </div>


            <div className='containerOutlet'>
                <Outlet />
            </div>



        </div>

    )
}
