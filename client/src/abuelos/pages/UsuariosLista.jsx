import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink} from 'react-router-dom'
import useArreglo from '../../hooks/useArreglo';
import '../Styles/UsuarioLista.css';

export const UsuariosLista = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [page, setPage] = useState([]);
    const [option, setOption] = useState(0)

   
    
    useEffect(() => {
       
      const GetData = async ()=>{
        const res = await axios.get('http://localhost:8080/api/usuarios',{params: {
           desde: 5*option
          }})
        setUsuarios(res.data.usuarios);
        setPage(useArreglo(Math.ceil((res.data.total/5))))
      }
      GetData();
    }, [option])
    
    return (
        <>
            <div className=" detalles">
        <table>
                <thead>
                    <tr>
                        <td>Nombre Usuario</td>
                        <td>Correo Electronico</td>
                        <td className='td-op'>Eliminar</td>
                        <td className='td-op'>Editar</td>           
                        <td className='td-op'>Ver</td>
                    </tr>
                </thead>
                <tbody>
                {
                        usuarios.map((res,idx)=>{
                            return(
                                <tr key={idx}>
                                    <td>{res.nombre}</td>
                                    <td>{res.correo}</td>
                                    <td className='td-op'><button className='delate'>Eliminar</button></td>
                                    <td className='td-op'><button className='edit'>Editar</button></td>
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
        </>
    )
}
