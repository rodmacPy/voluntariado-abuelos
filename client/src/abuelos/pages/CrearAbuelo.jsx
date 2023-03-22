import axios from 'axios';
import { useEffect, useState } from 'react';
import '../Styles/UpdateProfile.css'
import { useNavigate } from 'react-router-dom'
import { useForm } from '../../hooks/useForm';

export const CrearAbuelo = () => {
    const navigate = useNavigate()
    const [data, setData] = useState(null)
    const [file, setFile] = useState(null)
    const { token } = JSON.parse(localStorage.getItem('user'));
    const {
        nombre,
        fecha_nacimiento,
        genero,
        direccion,
        ciudad,
        onInputChange, onResetForm, handleFileChange } = useForm({
            nombre: '',
            fecha_nacimiento: '',
            genero: '',
            direccion: '',
            ciudad: ''
        })

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('fecha_nacimiento', fecha_nacimiento);
        formData.append('genero', genero);
        formData.append('direccion', direccion);
        formData.append('ciudad', ciudad);
        formData.append('archivo', file);

        axios.post(`http://localhost:8080/api/abuelos`, formData, {
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
    return (
        <div className='containerF'>
            <div className='update-profile'>
                <h2>Crear Abuela</h2>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='nombre'>Nombre:</label>
                        <input type='text' name='nombre' value={nombre} onChange={onInputChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='correo'>Fecha de nacimiento:</label>
                        <input type='date' name='fecha_nacimiento' value={fecha_nacimiento} onChange={onInputChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='genero'>Genero:</label>
                        <input type='text' name='genero' value={genero} onChange={onInputChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='direccion'>Direccion:</label>
                        <input type='text' name='direccion' value={direccion} onChange={onInputChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='ciudad'>Ciudad:</label>
                        <input type='text' name='ciudad' value={ciudad} onChange={onInputChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="img">Imagen:</label>
                        <input type="file" id="archivo" name="archivo" onChange={(e) => setFile(e.target.files[0])} />
                    </div>
                    <button type='submit'>Crear</button>
                </form>
            </div>
        </div>
    )
}
