import axios from 'axios';
import React from 'react'
import Swal from 'sweetalert2';

const CambiarRol = ({id,setContDetate,contDetate}) => {
  const envio = async ()=>{
    const { value: rol} = await Swal.fire({
      title: 'Seleccione Rol',
      input: 'select',
      inputOptions: {
          USER_ROLE: 'USER_ROLE',
          ADMIN_ROLE: 'ADMIN_ROLE',
      },
      inputPlaceholder: 'Seleccione rol',
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise(async(resolve) => {
          try {
              const respuesta = await axios.put(`http://localhost:8080/api/usuarios/rol/${id}`,{'rol':value})
              console.log(respuesta)
              setContDetate((contDetate == 0 ? 1 : 0))
              resolve()
          } catch (error) {
              console.log(error)
              
          }
        })
      }
    })
    
    if (rol) {
      Swal.fire(`You selected: ${rol}`)
    }
  }
  return (
    <button onClick={envio} className='edit'>Cambiar</button>
  )
}

export default CambiarRol