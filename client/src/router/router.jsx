import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { LayoutPage } from '../layout/LayoutPage'
import { LoginPage } from '../auth/'
import { CreateCategoria, CreateProduct, LandingPage, ProductosPage, ProfilePage, UpdateProfile, UploadImage } from '../abuelos'
import { PrivateRouter } from './PrivateRouter'
import { PublicRouter } from './PublicRouter'



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
                    }
                ]
            },
            {
                path: 'products',
                element: <ProductosPage />,

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
