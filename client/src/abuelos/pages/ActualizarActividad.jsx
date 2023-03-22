import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from '../../hooks/useForm';

export const ActualizarActividad = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    const { token } = JSON.parse(localStorage.getItem('user'));

    const [file, setFile] = useState(null)
    const { descripcion, nombre, onInputChange, onResetForm, setFormState, handleFileChange } = useForm({
        nombre: '',
        descripcion: ''

    })
    useEffect(() => {
        const GetData = async () => {
            const response = await axios.get(`http://localhost:8080/api/actividad/${id}`)

            setFormState({
                nombre: response.data.nombre || '',
                archivo: response.data.archivo || '',
                descripcion: response.data.descripcion || ''
            })

        }
        GetData();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);
        formData.append('archivo', file);

        try {
            console.log(formData)
            axios.put(`http://localhost:8080/api/actividad/${id}`, formData, {
                headers: {
                    'x-token': `${token}`
                }
            })
            navigate('/profile/actividades')
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className='containerF'>
            <div className='update-profile'>
                <h2>Crear Actividades</h2>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor="nombre">Nombre:</label>
                        <input type="text" id="nombre" name="nombre" value={nombre} onChange={onInputChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="img">Imagen:</label>
                        <input type="file" id="archivo" name="archivo" onChange={(e) => setFile(e.target.files[0])} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="descripcion">Descripción:</label>
                        <textarea id="descripcion" name="descripcion" value={descripcion} onChange={onInputChange}></textarea>
                    </div>
                    <button type="submit">Crear actividad</button>
                </form>
            </div>
        </div>
    );
};