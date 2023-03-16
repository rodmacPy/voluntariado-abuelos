import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { getDatosAuth } from '../helpers/getDatosAuth';

export const UploadImage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const uid = localStorage.getItem('uid')
        const formData = new FormData();
        formData.append('archivo', selectedFile);

        axios.put(`http://localhost:8080/api/uploads/usuarios/${uid}`, formData)
            .then(response => {
                console.log('Imagen subida exitosamente');
                alert('Imagen Actualizada');
                window.location.reload(true);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div>
            <h2>Subir imagen</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Subir</button>
            </form>
        </div>
    );
};
