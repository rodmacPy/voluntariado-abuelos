import { useState } from "react";
import axios from "axios";

export const AnimalForm = () => {
    const [animal, setAnimal] = useState({
        descripcion: "",
        edad: "",
        raza: "",
        salud: "",
        precio: "",
        imagen: null,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAnimal({ ...animal, [name]: value });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setAnimal({ ...animal, imagen: file });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("descripcion", animal.descripcion);
        formData.append("edad", animal.edad);
        formData.append("raza", animal.raza);
        formData.append("salud", animal.salud);
        formData.append("precio", animal.precio);
        formData.append("imagen", animal.imagen);

        try {
            const response = await axios.post(
                "http://localhost:8080/api/categorias",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="descripcion">Descripción</label>
                <input
                    type="text"
                    className="form-control"
                    id="descripcion"
                    name="descripcion"
                    value={animal.descripcion}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="edad">Edad</label>
                <input
                    type="text"
                    className="form-control"
                    id="edad"
                    name="edad"
                    value={animal.edad}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="raza">Raza</label>
                <input
                    type="text"
                    className="form-control"
                    id="raza"
                    name="raza"
                    value={animal.raza}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="salud">Salud</label>
                <input
                    type="text"
                    className="form-control"
                    id="salud"
                    name="salud"
                    value={animal.salud}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="precio">Precio</label>
                <input
                    type="text"
                    className="form-control"
                    id="precio"
                    name="precio"
                    value={animal.precio}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="imagen">Imagen</label>
                <input
                    type="file"
                    className="form-control-file"
                    id="imagen"
                    name="imagen"
                    onChange={handleImageChange}
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Guardar
            </button>
        </form>
    );
}