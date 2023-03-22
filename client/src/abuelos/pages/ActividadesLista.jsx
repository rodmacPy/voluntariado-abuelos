import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useArreglo from '../../hooks/useArreglo';
import '../Styles/UsuarioLista.css';
import {NavLink, Link } from 'react-router-dom'

export const ActividadesLista = () => {
    const [actividades, setActividades] = useState([]);
    const [page, setPage] = useState([]);
    const [option, setOption] = useState(0);
    const { token } = JSON.parse(localStorage.getItem('user'));
    const [contDetate, setContDetate] = useState(0);

    useEffect(() => {
      const GetData = async ()=>{
        const res = await axios.get('http://localhost:8080/api/actividad',{params: {
           desde: 5*option
          }})
        setActividades(res.data.actividades);

        setPage(useArreglo(Math.ceil((res.data.total/5))))
      }
      GetData();
    }, [option,contDetate])
    const delate = async(id)=>{
        try {
            await axios.delete(`http://localhost:8080/api/actividad/${id}`,{
                headers: {
                    'x-token': `${token}`
                }
            })
            setContDetate((contDetate==0?1:0))
        } catch (error) {
            console.log(error)
        }   
    }

    return (
        <>
             <div>
                <div className=" detalles">
                    <div className='hederAgregar'>
                        <h1 className='tituloPerfil'>Actividades</h1>
                        <Link  to={'./../crearactividad'}> <button className='btnAgrega'>Crear Actividad</button> </Link>
                    </div>
                    <table>
                            <thead>
                                <tr>
                                    <td>Nombre Actividad</td>
                                    <td> descripcion</td>
                                    <td className='td-op'>Eliminar</td>
                                    <td className='td-op'>Editar</td>           
                                    <td className='td-op'>Ver</td>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                    actividades.map((res,idx)=>{
                                        return(
                                            <tr key={idx}>
                                                <td>{res.nombre}</td>
                                                <td>{res.correo}</td>
                                                <td className='td-op'><button onClick={()=>delate(res._id)} className='delate'>Eliminar</button></td>
                                                <td className='td-op'><Link to={`./../actualizaractividad/${res._id}`}><button className='edit'>Editar</button></Link></td>
                                                <td className='td-op'><button className='ver'>Ver</button></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    <div className='nav-foot'>
                            {
                                page.map((e,i)=><NavLink onClick={()=>setOption(i)} key={i} className='nav-footN'> {e+1} </NavLink>)
                            }
                    </div>
                </div>
            </div>
        </>

    )
}
