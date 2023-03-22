import axios from 'axios';
import { useEffect, useState } from 'react';
import '../Styles/UpdateProfile.css'
import {useNavigate, useParams} from 'react-router-dom'

export const ActualizarUsuario= () => {
    const {id}=useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        ciudad: '',
        direccion: ''
    });
    useEffect(() => {
        const GetData = async ()=>{
          const response = await axios.get(`http://localhost:8080/api/usuarios/${id}`)
            setFormData({
                nombre: response.data.nombre || '',
                apellido: response.data.apellido || '',
                correo: response.data.correo || '',
                ciudad: response.data.ciudad || '',
                direccion: response.data.direccion || '',
            })
            
        }
        GetData();
      }, [])
   
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/api/usuarios/update/${id}`, formData)
            .then(response => {
                navigate('/profile/usuarios')
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
}