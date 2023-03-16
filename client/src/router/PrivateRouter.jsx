import React, { useContext } from 'react'
import { Navigate } from 'react-router'
import { AuthContext } from '../auth'

export const PrivateRouter = ({ children }) => {
    const { logged } = useContext(AuthContext)
    return (logged) ?
        children
        : <Navigate to='/login' />
}
4605397 