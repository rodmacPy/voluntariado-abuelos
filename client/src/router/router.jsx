import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { LayoutPage } from '../layout/LayoutPage'
import { LoginPage } from '../auth/'
import { AnimalForm, DCPage, HeroPage, LandingPage, MarvelPage, SearchPage } from '../farm'
import { PrivateRouter } from './PrivateRouter'
import { PublicRouter } from './PublicRouter'
import { ProfilePage } from '../farm/pages/ProfilePage'
import { UpdateProfile } from '../farm/components/UpdateProfile'
import { UploadImage } from '../farm/components/UploadImage'
import { CreateCategoria } from '../farm/components/CreateCategoria'
import { CreateProduct } from '../farm/components/CreateProduct'
import { ProductosPage } from '../farm/pages/ProductosPage'



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
                path: 'search',
                element: <SearchPage />,

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
