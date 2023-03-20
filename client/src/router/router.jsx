import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { LayoutPage } from '../layout/LayoutPage'
import { LoginPage } from '../auth/'
import {
    About,
    AbuelosLista,
    ActividadesLista,
    Activities,
    Contact,
    CrearAbuelo,
    CrearRol,
    LandingPage,
    ProfilePage,
    RolesLista,
    UpdateProfile,
    UploadImage,
    UsuariosLista,
    Volunteers
} from '../abuelos'

import { PrivateRouter, PublicRouter } from './'
import CrearActividad from '../abuelos/pages/CrearActividad'



export const router = createBrowserRouter([
    {
        path: '/',
        element: <LayoutPage />
        ,
        children: [
            {
                path: '/',
                element:
                    <LandingPage />
            },
            {
                path: '/volunteers',
                element:
                    <Volunteers />
            },
            {
                path: '/activities',
                element:
                    <Activities />
            },
            {
                path: '/about',
                element:
                    <About />
            },
            {
                path: '/contact',
                element:
                    <Contact />
            },
            ,
            {
                path: 'profile',
                element:
                    <PrivateRouter>
                        <ProfilePage />
                    </PrivateRouter>,
                children: [
                    {
                        path: 'update',
                        element: <UpdateProfile />
                    },
                    {
                        path: 'crearabuelo',
                        element: <CrearAbuelo />
                    },
                    {
                        path: 'crearactividad',
                        element: <CrearActividad />
                    },
                    {
                        path: 'crearrol',
                        element: <CrearRol />
                    },
                    {
                        path: 'updateimage',
                        element: <UploadImage />
                    },
                    {
                        path: 'actividades',
                        element: <ActividadesLista />
                    },
                    {
                        path: 'abuelos',
                        element: <AbuelosLista />
                    },
                    {
                        path: 'usuarios',
                        element: <UsuariosLista />
                    },
                    {
                        path: 'roles',
                        element: <RolesLista />
                    }
                ]
            },
            {
                path: 'products',
                element: <Activities />,

            },
        ]
    },
    {
        path: 'login',
        element:
            <PublicRouter>
                <LoginPage />
            </PublicRouter>,
    },
])
