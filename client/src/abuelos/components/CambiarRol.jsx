import axios from 'axios';
import React from 'react'
import { useOutletContext } from 'react-router-dom';
import Swal from 'sweetalert2';

// const { value: fruit } = await Swal.fire({
//     title: 'Select field validation',
//     input: 'select',
//     inputOptions: {
//       'Rol': {
//         USER_ROLE: 'USER_ROLE',
//         bananas: 'ADMIN_ROLE',
//       },
//     },
//     inputPlaceholder: 'Seleccione rol',
//     showCancelButton: true,
//     inputValidator: (value) => {
//       return new Promise(async(resolve) => {
//         try {
//             await axios.post('')
//         } catch (error) {
            
//         }
//       })
//     }
//   })
  
//   if (fruit) {
//     Swal.fire(`You selected: ${fruit}`)
//   }
const CambiarRol = ({id,unidadesA}) => {
  const {setActivador} = useOutletContext();
  const envio = async ()=>{
    try {
      const { value: unidades } = await Swal.fire({
        title: 'Cuantas unidades repuso',
        input: 'number',
        inputLabel: 'unidades',
        inputPlaceholder: 'Ingrese numero de unidades',
        inputAttributes: {
          maxlength: 10,
          autocapitalize: 'off',
          autocorrect: 'off'
        }
      })
      
      if (Number(unidades)) {
        const actulizacion =  await axios.put(`${process.env.REACT_APP_API_URL}/api/reponer/${id}`,{'unidades':(Number(unidades)+unidadesA)})
        setActivador([id])
        console.log(actulizacion)
        console.log(unidades)
  
        Swal.fire(`Correcto: ${unidades}`)
      }
    } catch (error) {
      console.log(error)
    }
    
  }
  return (
    <button onClick={envio} className='btn btn-primary'>Reponer</button>
  )
}

export default CambiarRol