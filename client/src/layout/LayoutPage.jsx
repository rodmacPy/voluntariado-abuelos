import React from 'react'
import { Outlet } from 'react-router'

import { Navbar } from '../ui'

export const LayoutPage = () => {
    return (
        <>

            <Navbar />
            <Outlet />

        </>
    )
}
