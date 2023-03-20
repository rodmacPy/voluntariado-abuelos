import React from 'react'
import { Link } from 'react-router-dom'

export const AbuelosLista = () => {
    return (
        <>
            <h1>Abuelos</h1> <Link to={'./../crearabuelo'}>Crear Abuelo </Link>

            <div>
                <h3>ver todos los abuelos en una lista con</h3>
                <p>Ver - Editar - Eliminar</p>
            </div>
        </>
    )
}
