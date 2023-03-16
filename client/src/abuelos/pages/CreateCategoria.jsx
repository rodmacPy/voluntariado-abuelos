import axios from 'axios';
import { useEffect, useState } from 'react';

export const CreateCategoria = () => {

    const { token } = JSON.parse(localStorage.getItem('user'));
    const [formData, setFormData] = useState({
        nombre: '',

    });
    const validarToken = () => {
        axios.get('http://localhost:8080/api/auth/', {
            headers: {
                'x-token': `${token}`
            }
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/categorias/', formData, {
            headers: {
                'x-token': `${token}`
            }
        })
            .then(response => {
                console.log(response)
                alert('Categoria creada exitosamente');
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
            <h2>Crear Categoria</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='nombre'>Nombre:</label>
                    <input type='text' name='nombre' value={formData.nombre} onChange={handleInputChange} />
                </div>
                <button type='submit'>Actualizar</button>
            </form>
        </div>
    )
}
