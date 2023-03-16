import axios from "axios";
import { useEffect, useMemo, useState } from "react";

export const getDatosAuth = () => {
    const [data, setData] = useState(null)
    const getDatos = () => {
        const { token } = JSON.parse(localStorage.getItem('user'));
        axios.get('http://localhost:8080/api/auth/', {
            headers: {
                'x-token': `${token}`
            }
        })
            .then(response => {
                localStorage.setItem("uid", response.data.usuario.uid);
                setData(response.data.usuario)
            })
            .catch(error => {
                console.log(error)
            });
    }
    useEffect(() => {
        getDatos()
    }, [])

    return {
        data,
        getDatos
    }
}