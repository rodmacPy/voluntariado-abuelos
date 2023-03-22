import axios from 'axios';
import { useEffect, useState } from 'react';
import '../Styles/UpdateProfile.css'
import {useNavigate} from 'react-router-dom'

export const CrearAbuelo = () => {
    const navigate = useNavigate()
    const [data, setData] = useState(null)
    const { token } = JSON.parse(localStorage.getItem('user'));
    const [formData, setFormData] = useState({
        nombre: '',
        fecha_nacimiento: '',
        genero: '',
        direccion: '',
        ciudad: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8080/api/abuelos`, formData,{
            headers: {
                'x-token': `${token}`
            }
        })
            .then(response => {
                setData(response.data.usuario)
                navigate('/profile/abuelos')
            })
            .catch(error => {
                console.log(error)
            });
    }

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }
    return (
        <div className='containerF'>
        <div className='update-profile'>
            <h2>Crear Abuela</h2>
            <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='nombre'>Nombre:</label>
                        <input type='text' name='nombre' value={formData.nombre} onChange={handleInputChange} />
                    </div>
                <div className='form-group'>
                    <label htmlFor='correo'>Fecha de nacimiento:</label>
                    <input type='date' name='fecha_nacimiento' value={formData.fecha_nacimiento} onChange={handleInputChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor='genero'>Genero:</label>
                    <input type='text' name='genero' value={formData.genero} onChange={handleInputChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor='direccion'>Direccion:</label>
                    <input type='text' name='direccion' value={formData.direccion} onChange={handleInputChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor='ciudad'>Ciudad:</label>
                    <input type='text' name='ciudad' value={formData.ciudad} onChange={handleInputChange} />
                </div>
                <button type='submit'>Crear</button>
            </form>
        </div>
    </div>
    )
}
