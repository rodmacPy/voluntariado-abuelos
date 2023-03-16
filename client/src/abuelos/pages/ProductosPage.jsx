import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../Styles/ProductosPage.css'
export const ProductosPage = () => {
    const [data, setData] = useState(null)
    const [categorias, setCategorias] = useState(null)
    const getData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/productos')
            setData(response.data.Productos)
        } catch (error) {
            console.log(error)
        }
    }

    const getCategorias = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/categorias/')
            setCategorias(response.data.categorias)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
        getCategorias()
    }, [])
    // console.log(data[0].categoria._id)
    const handleFilter = async(id) =>{
        try {
            const response = await axios.get('http://localhost:8080/api/productos')
            const nuevaData = response.data.Productos.filter( item => item.categoria._id === id)
            setData(nuevaData)
        } catch (error) {
            console.log(error)
        }
    }
    console.log(data)

    return (
        <div className='product-container'>
            <div className='product-botones'>
                {categorias?.map(categoria =>
                    <button className='product-button' key={categoria._id} onClick={() => handleFilter(categoria._id)}>{categoria.nombre}</button>
                )}
            </div>
            <div className='productos'>
                    {data?.map(producto => 
                    <div className='product-cart'>
                        <p>{producto.nombre}</p>
                        <img src={`http://localhost:8080/api/uploads/productos/${producto._id}`} alt="" />
                        <p>{producto.precio}</p>
                    </div>
                    )}
            </div>
        </div>
    )
}
