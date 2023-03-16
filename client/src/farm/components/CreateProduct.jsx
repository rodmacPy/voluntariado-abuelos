import axios from "axios";
import { useEffect, useState } from "react";
import '../Styles/CreateProduct.css'

export const CreateProduct = () => {
    const [categorias, setCategorias] = useState(null)
    const [producto, setProducto] = useState({
        nombre: "",
        precio: "",
        categoria: "",
        descripcion: "",
        img: ""
    });
    const [imagen, setImagen] = useState("");

    const handleChange = (e) => {
        setProducto({
            ...producto,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        setImagen(e.target.files[0]);
    };

    useEffect(() => {
        axios.get('http://localhost:8080/api/categorias/')
            .then(response => setCategorias(response.data.categorias))
            .catch(error => console.log(error))
    }, [])
    const subirFoto = async() =>{
        const formData = new FormData();
        formData.append('archivo', imagen);

        const response = await axios.post(`http://localhost:8080/api/uploads`, formData)
        setProducto({
            ...producto,
            img: response.data.nombre
        })
    }

    const crearProducto = async() =>{
        const { token } = JSON.parse(localStorage.getItem('user'));
        await axios.post("http://localhost:8080/api/productos", producto, {
            headers: {
                'x-token': `${token}`
            }
        })
            .then(response => console.log(response))
            .catch(error => console.log(error))
        alert('Producto creado exitosamente');
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        subirFoto();
        crearProducto();

        // axios
        //     .post("http://localhost:8080/api/uploads/productos/", formData)
        //     .then((response) => {
        //         const img = response.data;
        //         const newProducto = {
        //             ...producto,
        //             img: img,
        //         };
        //         axios.post("http://localhost:8080/api/producto", newProducto);
        //     })
        //     .catch((error) => console.log(error));
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="form__group">
                <label className="form__label">
                    Nombre:
                </label>
                <input className="form__input" type="text" name="nombre" value={producto.nombre} onChange={handleChange} required />
            </div>
            <div className="form__group">
                <label className="form__label">
                    Precio:
                </label>
                <input className="form__input" type="text" name="precio" value={producto.precio} onChange={handleChange} required />
            </div>
            <div className="form__group">
                <label className="form__label" htmlFor="categoria">
                    Categoría:
                </label>
                <select className="form__select" onChange={handleChange} name='categoria'>
                    <option value={producto.categoria}>Seleccione una categoría</option>
                    {categorias?.map(categoria => (
                        <option key={categoria._id} value={categoria._id}>
                            {categoria.nombre}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form__group">
                <label className="form__label">
                    Descripción:
                </label>
                <textarea className="form__textarea" name="descripcion" value={producto.descripcion} onChange={handleChange} />
            </div>
            <div className="form__group">
                <label className="form__label">
                    Imagen:
                </label>
                <input className="form__file" type="file" onChange={handleImageChange} required />
            </div>
            <button className="form__submit" type="submit">Crear Producto</button>
        </form>

    );
};
