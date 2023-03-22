import axios from 'axios';
import React, { useEffect,useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom'

export const ActualizarActividad = () => {
    const {id}=useParams()
    const { token } = JSON.parse(localStorage.getItem('user'));
    const navigate= useNavigate();
    const [file, setFile] = useState(null)
    const [formData, setFormData] = useState({
        nombre: '',
        archivo: '',
        descripcion: ''
    });
    useEffect(() => {
        const GetData = async ()=>{
          const response = await axios.get(`http://localhost:8080/api/actividad/${id}`)
          console.log(response)
            setFormData({
                nombre: response.data.nombre || '',
                archivo: response.data.archivo || '',
                descripcion: response.data.descripcion || ''
            })
            
        }
        GetData();
      }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log(formData)
            axios.put(`http://localhost:8080/api/actividad/${id}`, formData,{
                headers: {
                    'x-token': `${token}`
                }
            })
            navigate('/profile/actividades')
        } catch (error) {
            console.error(error);
        }
    };
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }
    return (
        <div className='containerF'>
        <div className='update-profile'>
            <h2>Crear Actividades</h2>
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label htmlFor="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} />
            </div>
            <div className='form-group'>
                <label htmlFor="img">Imagen:</label>
                <input type="file" id="archivo" name="archivo" onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <div className='form-group'>
                <label htmlFor="descripcion">Descripción:</label>
                <textarea id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleInputChange}></textarea>
            </div>
            <button type="submit">Actualizar actividad</button>
        </form>
        </div>
        </div>
    );
};