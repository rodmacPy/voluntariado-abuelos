import React from 'react'
import { Link } from 'react-router-dom'

export const ActividadesLista = () => {
    return (
        <>
            <h1>Actividades</h1> <Link to={'./../crearactividad'}> Crear Actividad</Link> 

            <div>
                <h3>ver todas las actividades en una lista con</h3>
                <p>Ver - Editar - Eliminar</p>
            </div>
        </>

    )
}
