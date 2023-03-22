import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../Styles/Activities.css'

export const Activities = () => {

    const [actividades, setActividades] = useState([])
    useEffect(() => {

        const GetData = async () => {
            const res = await axios.get('http://localhost:8080/api/actividad', {
            })
            setActividades(res.data.actividades);
        }
        GetData();

    }, [])
    const handleParticipar = async (idActi)=> {
        try {
          e.preventDefault();
          const respuesta = axios.put(`http://localhost:8080/api/actividad/${idActi}`,{
            headers: {
                'x-token': `${token}`
            }
            
        })
        console.log(respuesta)
        } catch (error) {
          
        }
      }
      console.log(actividades)
    return (
        <>
        <div className='container'>
          {actividades.map((actividad, index) =>
            <div className="card" key={index}>
              <img src={`http://localhost:8080/api/uploads/actividad/${actividad.img}`} style={{ "width": '100%' }} />
              <div className="container">
                <h3>{actividad.nombre}</h3>
                <h4>{actividad.descripcion}</h4>
                <div className="button-container">
                  <button className="participar-btn" onClick={() => handleParticipar(actividad._id)}>Participar</button>
                </div>
              </div>
            </div>
          )}
        </div>
        </>
    )

}
