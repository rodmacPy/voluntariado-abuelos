import axios from 'axios';
import { useEffect, useState } from 'react';
import '../Styles/UpdateProfile.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from '../../hooks/useForm';

export const ActualizarAbuelo = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [file, setFile] = useState(null)
    const { token } = JSON.parse(localStorage.getItem('user'));
    const {
        nombre, fecha_nacimiento,
        genero, direccion, ciudad,
        onInputChange, onResetForm, setFormState, handleFileChange } = useForm({
            nombre: '',
            fecha_nacimiento: '',
            genero: '',
            direccion: '',
            ciudad: ''
        })
    useEffect(() => {
        const GetData = async () => {
            const response = await axios.get(`http://localhost:8080/api/abuelos/${id}`)
            console.log(response)
            setFormState({
                nombre: response.data.nombre || '',
                fecha_nacimiento: response.data.fecha_nacimiento || '',
                genero: response.data.genero || '',
                direccion: response.data.direccion || '',
                ciudad: response.data.ciudad || '',
            })
        }
        GetData();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('fecha_nacimiento', fecha_nacimiento);
        formData.append('genero', genero);
        formData.append('direccion', direccion);
        formData.append('ciudad', ciudad);
        formData.append('archivo', file);

        axios.put(`http://localhost:8080/api/abuelos/${id}`, formData, {
            headers: {
                'x-token': `${token}`
            }
        })
            .then(response => {
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
                <h2>Actulizar datos de abuelo</h2>
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
                        <select htmlFor='genero' name='genero' value={genero} onChange={onInputChange}>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                        </select>

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
                    <button type='submit'>Actulizar</button>
                </form>
            </div>
        </div>
    )
}
