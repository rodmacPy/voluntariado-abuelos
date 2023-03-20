import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser';
import '../../Styles/ContactComponent.css'

const Result =()=>{
    return(
        <h4>Su mensaje ha sido enviado con éxito. Pronto nos pondremos en contacto con usted</h4>
    )
}

function ContactComponent(props) {
    const form = useRef();
    const [result, setResult] = useState(false);
    const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('gmail', 'template_r2tg02c', form.current, 'JKVflmbsOvKbZozYI')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        e.target.reset();
        setResult(true);
    };
    //hide result
    setTimeout (() =>{
        setResult(false);
    }, 3000);
return (
        <form ref={form} onSubmit={sendEmail} className='email-form'>
            <div className='formWord animate__animated animate__fadeInUp'>
                <h1>Envianos un correo.</h1>
                <span>Nombre Completo</span>
                <br/>
                <input
                className='input100'
                type='text'
                name='fullName'
                required
                />
                <br/>
                <span>Numero de Telefono</span>
                <br/>
                <input
                className='input100'
                type='text'
                name='phone'
                required
                />
                <br/>
                <span>Email</span>
                <br/>
                <input
                className='input100'
                type='text'
                name='email'
                required
                />
                <br/>
            </div>
            <div className='formWord'>
                <span>Mensaje</span>
                <br/>
                <textarea name='message' required></textarea>
                <br/>
                <button>Enviar</button>

                <div className='row'>{ result ? <Result/> : null }</div>
            </div>
        </form>
  )
}

export default ContactComponent