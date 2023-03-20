import React from 'react'
import Typical from 'react-typical'
import 'animate.css';

//import '../Styles/LandingPage.css'

export const LandingPage = () => {
    return (
        <>
            <section id='hero' className='animate__animated animate__fadeInLeft'>
                <div className='hero-div'>
                        <h1 className="animate__animated animate__fadeInLeft">Bienvenidos</h1>
                    
                    <p className="animate__animated animate__fadeInLeft">
                        <Typical
                        loop={Infinity}
                        wrapper='b'
                        steps={[
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
                        ]}
                        />
                    </p>
                </div>
            </section>
        </>
    )
}
