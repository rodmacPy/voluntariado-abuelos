
import React from 'react'
import { Link } from 'react-router-dom'
import '../Styles/Contact.css'
import ContactComponent from './contactComponet/ContactComponent'

export const Contact = () => {
    return (
        <>
                <div className='contact'>
                    <img className="animate__animated animate__fadeInUp" src='../../../assets/operador-centro-asistencia-.png' alt='contactUs' />
                </div>
                <div className='contact-title animate__animated animate__fadeInUp'>
                    <h1>¿Cómo te podemos ayudar?</h1>
                </div>
                <ContactComponent/>8
                <div className='icon-contact'>
                <Link><i className="fa-brands fa-facebook fa-3x  animate__animated animate__fadeInDownBig "  ></i></Link>
                <Link><i className="fa-brands fa-twitter fa-3x  animate__animated animate__fadeInUpBig "  ></i></Link>
                <Link><i className="fa-brands fa-instagram fa-3x  animate__animated animate__fadeInDownBig "  ></i></Link>
                <Link><i className="fa-brands fa-whatsapp fa-3x  animate__animated animate__fadeInUpBig "  ></i></Link>
                </div>
        </>
    )
}
