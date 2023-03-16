import React from 'react'
import { Outlet } from 'react-router'
import { AuthProvider } from '../auth'

import { Navbar } from '../ui'

export const LayoutPage = () => {
    return (
        <>

            <Navbar />
            <Outlet />

        </>
    )
}
