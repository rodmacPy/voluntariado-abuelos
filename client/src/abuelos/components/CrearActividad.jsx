import React, { useState } from 'react';

const CrearActividad = () => {
    const { descripcion, img, nombre, onInputChange, onResetForm, setFormState } = useForm({
        nombre: '', 
        img: '', 
        descripcion: '' 
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);
        formData.append('img', img);

        try {
            const response = await fetch('http://localhost:8080/api/actividad', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" value={nombre} onChange={onInputChange} />
            </div>
            <div>
                <label htmlFor="img">Imagen:</label>
                <input type="file" id="img" name="img" onChange={(e) => setFormState({ ...actividad, img: e.target.files[0] })} />
            </div>
            <div>
                <label htmlFor="descripcion">Descripción:</label>
                <textarea id="descripcion" name="descripcion" value={descripcion} onChange={onInputChange}></textarea>
            </div>
            <button type="submit">Crear actividad</button>
        </form>
    );
};

export default CrearActividad;
