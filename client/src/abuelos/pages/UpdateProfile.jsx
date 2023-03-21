import axios from 'axios';
import { useEffect, useState } from 'react';
import '../Styles/UpdateProfile.css'
export const UpdateProfile = () => {
    const [data, setData] = useState(null)
    const { token } = JSON.parse(localStorage.getItem('user'));
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        password: '',
        ciudad: '',
        direccion: ''
    });
    const validarToken = () => {
        axios.get('http://localhost:8080/api/auth/', {
            headers: {
                'x-token': `${token}`
            }
        })
            .then(response => {
                setData(response.data.usuario.uid)
                setFormData({
                    nombre: response.data.usuario.nombre || '',
                    apellido: response.data.usuario.apellido || '',
                    correo: response.data.usuario.correo || '',
                    password: response.data.usuario.password || '',
                    ciudad: response.data.usuario.ciudad || '',
                    direccion: response.data.usuario.direccion || '',
                })
                
            })
            .catch(error => {
                console.log(error)
            });
    }
    useEffect(() => {
        validarToken()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/api/usuarios/${data}`, formData)
            .then(response => {
                setData(response.data.usuario)
                alert('Datos actualizados');
                
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
        <div className='update-profile'>
            <h2>Actualizar perfil</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-flex'>
                    <div className='form-group'>
                        <label htmlFor='nombre'>Nombre:</label>
                        <input type='text' name='nombre' value={formData.nombre} onChange={handleInputChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='apellido'>Apellido:</label>
                        <input type='text' name='apellido' value={formData.apellido} onChange={handleInputChange} />
                    </div>
                </div>
                <div className='form-group'>
                    <label htmlFor='correo'>Correo electrónico:</label>
                    <input type='email' name='correo' value={formData.correo} onChange={handleInputChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Contraseña:</label>
                    <input type='password' name='password' value={formData.password} onChange={handleInputChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor='ciudad'>Ciudad:</label>
                    <input type='text' name='ciudad' value={formData.ciudad} onChange={handleInputChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor='direccion'>Dirección:</label>
                    <input type='text' name='direccion' value={formData.direccion} onChange={handleInputChange} />
                </div>
                <button type='submit'>Actualizar</button>
            </form>
        </div>
    );
};
