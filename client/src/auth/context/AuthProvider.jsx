
import { useReducer } from 'react'
import { types } from '../types/types';
import { AuthContext } from './AuthContext';
import { authReducer } from './AuthReducer';


const init = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    return {
        logged: !!user,
        user: user,
    }
}
export const AuthProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {}, init)
    
    const login = async (name='', token) => {
        const user = {
            name,
            token
        }
        const action = {
            type: types.login,
            payload: user
        }
        localStorage.setItem('user', JSON.stringify(user));
        // localStorage.setItem("token", token);
        dispatch(action);
    }

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        const action = {
            type: types.logout
        };
        dispatch(action);
    }

    return (
        <AuthContext.Provider value={{
            ...authState,
            login, logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}
