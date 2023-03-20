import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const UsuariosLista = () => {
    const [usuarios, setUsuarios] = useState([])

    const getUsuarios = async () => {
        try {
            console.log('getUsuarios');
            const response = await axios.get('http://localhost:8080/api/usuarios')

            console.log(response);
            console.log(response.data?.usuarios);
            setUsuarios(response.data?.usuarios)
        } catch (error) {

        }
    }

    useEffect(() => {
        getUsuarios();
    }, [])


    return (
        <>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario, index) => <tr key={index}>
                        <td> {usuario.nombre}</td>
                        <td> {usuario.correo}</td>
                        <td> {usuario.rol}</td>
                        <td> {usuario.uid}</td>
                    </tr>)}
                </tbody>
            </table>
        </>
    )
}
