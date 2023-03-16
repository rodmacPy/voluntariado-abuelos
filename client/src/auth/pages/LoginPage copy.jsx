import axios from "axios"
import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import { AuthContext } from "../context/AuthContext"



export const LoginPage = () => {
    const { login } = useContext(AuthContext)
    const [formData, setFormData] = useState(
        {
            correo: '',
            password: ''
        }
    );

    const navigate = useNavigate()
    const onlogin = () => {
        login(formData.correo, formData.password)
        navigate('/', {
            replace: true
        });
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const res = await axios.post("http://localhost:8080/api/auth/login", {
    //             correo: formData.email,
    //             password: formData.password,
    //         });
    //         const token = res.data.token;
    //         localStorage.setItem("token", token);
    //         login();
    //         navigate("/");
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8080/api/auth/login",
                formData
            );
            
            const { token } = response.data;
            const { nombre } = response.data.usuario
            // Guardar el token en el almacenamiento local del navegador
            
            
            // Establecer el token en la cabecera de autorización de Axios
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            // Iniciar sesión del usuario en la aplicación
            login(nombre, token);
            // Redirigir al usuario a la página principal
            navigate('/', {
                replace: true
            });
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title mb-4">Login</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="correo" className="form-label">
                                        Correo
                                    </label>
                                    <input
                                        type="correo"
                                        className="form-control"
                                        id="correo"
                                        name="correo"
                                        value={formData.correo}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
