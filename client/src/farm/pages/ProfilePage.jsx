import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../auth';
import { getDatosAuth } from '../helpers/getDatosAuth';
import '../Styles/ProfilePage.css'

export const ProfilePage = () => {

    const { logout, logged } = useContext(AuthContext)
    const { data } = getDatosAuth()
    const onLogout = () => {
        logout()
        navigation('/login', {
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
                    <Link
                        to="update"
                    >
                        Actualizar Datos
                    </Link>
                    <Link
                        to="updateimage"
                    >
                        Actualizar Imagen
                    </Link>
                    <Link
                        to="vender"
                    >
                        Vender Producto
                    </Link>
                    <Link
                        to="categoria"
                    >
                        Crear Categoria
                    </Link>
                    <button className='button-link' onClick={onLogout}>
                        Cerrar Sesion
                    </button>
                </div>
            </div>


            <Outlet />



        </div>

    )
}
