import React from 'react'
import Typical from 'react-typical'
//import '../Styles/LandingPage.css'

export const LandingPage = () => {
    return (
        <>
            <section id='hero'>
                <div className='hero-div'>
                    <h1>Bienvenidos</h1>
                    <p>
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
