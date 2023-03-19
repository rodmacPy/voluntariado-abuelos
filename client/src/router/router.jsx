import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { LayoutPage } from '../layout/LayoutPage'
import { LoginPage } from '../auth/'
import {
    About,
    ActividadesLista,
    Activities,
    Contact,
    CreateCategoria,
    CreateProduct,
    LandingPage,
    ProfilePage,
    RolesLista,
    UpdateProfile,
    UploadImage,
    UsuariosLista,
    Volunteers
} from '../abuelos'

import { PrivateRouter, PublicRouter } from './'



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
                        path: 'updateimage',
                        element: <UploadImage />
                    },
                    {
                        path: 'vender',
                        element: <CreateProduct />
                    },
                    {
                        path: 'categoria',
                        element: <CreateCategoria />
                    },
                    {
                        path: 'actividades',
                        element: <ActividadesLista />
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
