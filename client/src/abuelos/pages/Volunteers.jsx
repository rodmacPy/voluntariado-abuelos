import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../Styles/Volunteers.css'

export const Volunteers = () => {
    const [usuarios, setUsuarios] = useState([]);


    useEffect(() => {

        const GetData = async () => {
            const res = await axios.get('http://localhost:8080/api/usuarios', {
            })
            setUsuarios(res.data.usuarios);

        }
        GetData();
    }, [])
    return (
        <>
            <div className="detalles container">
                {usuarios.map((res, idx) => {
                    return (
                        <div key={idx} className="card">
                            <div className="card-body">
                                <h5 className="card-title">{res.nombre}</h5>
                                <p className="card-text">{res.correo}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
