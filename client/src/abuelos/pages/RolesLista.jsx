import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink} from 'react-router-dom'
import useArreglo from '../../hooks/useArreglo';
import '../Styles/UsuarioLista.css';

export const RolesLista = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [page, setPage] = useState([]);
    const [option, setOption] = useState(0);
    const { token } = JSON.parse(localStorage.getItem('user'));
    const [contDetate, setContDetate] = useState(0);

   
    
    useEffect(() => {
       
      const GetData = async ()=>{
        const res = await axios.get('http://localhost:8080/api/usuarios',{params: {
           desde: 5*option
          }})
        setUsuarios(res.data.usuarios);
        setPage(useArreglo(Math.ceil((res.data.total/5))))
      }
      GetData();
    }, [option,contDetate])
    const delate = async(id)=>{
        try {
            await axios.delete(`http://localhost:8080/api/usuarios/${id}`,{
                headers: {
                    'x-token': `${token}`
                }
            })
            setContDetate((contDetate==0?1:0))
        } catch (error) {
            console.log(error)
        }
        
    }
    console.log(usuarios)
    return (
        <>
            <div className=" detalles">
        <table>
                <thead>
                    <tr>
                        <td>Nombre Usuario</td>
                        <td>Rol del Usuario</td>
                        <td className='td-op'>Cambiar Rol</td>  
                        <td className='td-op'>Eliminar</td>         
                    </tr>
                </thead>
                <tbody>
                {
                        usuarios.map((res,idx)=>{
                            return(
                                <tr key={idx}>
                                    <td>{res.nombre}</td>
                                    <td><strong>{res.rol}</strong></td>
                                    <td className='td-op'><button className='edit'>Cambiar</button></td>
                                    <td className='td-op'><button onClick={()=>delate(res.uid)} className='delate'>Eliminar</button></td>
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
