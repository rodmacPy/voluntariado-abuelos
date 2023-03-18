import React from 'react'
import Typical from 'react-typical'
import 'animate.css';

//import '../Styles/LandingPage.css'

export const LandingPage = () => {
    const steps = [
        'Cuidando a quienes cuidaron de nosotros.',
        1000,
        'Dar a los mayores el cariño que se merecen.',
        1000,
        'Acompañemos a nuestros mayores en su camino.',
        1000,
        'Haciendo la vida de los ancianos mas facil cada dia.',
        1000,
        'Uniendo nuestras manos para cuidar a nuestros mayores.',
        1000,
    ]
    return (
        <>
            <section id='hero' className='animate__animated animate__fadeInRight'>
                <div className='hero-div animate__animated animate__bounce'>
                    <h1>Bienvenidos</h1>

                    <p>
                        <Typical wrapper="b" steps={steps} loop={Infinity}/>
                    </p>
                </div>
            </section>
        </>
    )
}
