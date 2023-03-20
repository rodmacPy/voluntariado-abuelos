import React from 'react'
import '../Styles/About.css';
import { AnimationOnScroll } from 'react-animation-on-scroll';


export const About = () => {
    return (
        <>
        <div className='container-sobre '>
            <section className='sobre_nosotros'>
              <div className="img animate__animated animate__backInUp"></div>
              <div className="sobre_info animate__animated animate__rotateIn">
                <h2 className='text-title '>Sobre nosotros</h2>
                <p className='p-sobre'>Buscamos fomentar la integración y participación ciudadana a través del voluntariado, para promover el desarrollo social y comunitario en áreas vulnerables. Queremos involucrar y motivar a los ciudadanos para que sean parte activa del cambio positivo en su comunidad.  <br></br>
                Creemos firmemente que al trabajar juntos como equipo se pueden crear soluciones sostenibles ante situaciones difíciles, por lo cual nuestro objetivo es empoderar a las personas para hacerlo posible.
                </p>
              </div>
            </section>
            <section>
              <div className='conteiner-history'>  
                <div className="section-history">
                    <div className="history">
                      <AnimationOnScroll  animateIn="animate__backInLeft">
                        <h2 className='text-history'>Historia</h2>
                      </AnimationOnScroll>
                      <AnimationOnScroll  animateIn="animate__backInLeft">
                        <p className='p-sobre'>La creación de este espacio nació a partir de una idea sencilla pero poderosa: mejorar la calidad de vida y el bienestar emocional de las personas mayores en nuestra comunidad. <br /> El voluntariado siempre ha sido una forma valiosa y gratificante para ayudar a los demás, pero nos dimos cuenta que aún existían muchas necesidades no cubiertas para nuestros adultos mayores. <br />
                        Fue entonces cuando decidimos crear una organización enfocada específicamente en brindar a esta población vulnerable. Nuestra misión es conectar personas jóvenes con ancianos solitarios o marginados, brindándoles compañía, ayuda práctica y apoyo emocional.</p>
                      </AnimationOnScroll>
                    </div>
                </div>
                <div className="history-img">
                  <AnimationOnScroll  animateIn="animate__backInRight">
                  <div className="img img-1"></div>
                  </AnimationOnScroll>
                </div>
              </div>
              
            </section>
            <section>   
              <div className='conteiner-history'>
                <div className="history-img">
                  <AnimationOnScroll  animateIn="animate__backInLeft">
                    <div className="img img-2"></div>
                  </AnimationOnScroll>
                </div>
                <div className="section-history">
                    <div className="history">
                      <AnimationOnScroll  animateIn="animate__backInRight">
                        <h2 className='text-history'>Mision</h2>
                      </AnimationOnScroll>
                      <AnimationOnScroll  animateIn="animate__backInRight">
                        <p className='p-sobre'>Fomentar la participación ciudadana a través del voluntariado, promoviendo el desarrollo social y comunitario en áreas vulnerables.</p>
                      </AnimationOnScroll>
                    </div>
                </div>
              </div>  
            </section>
            <section>   
              <div className='conteiner-history'>
                <div className="section-history">
                    <div className="history">
                      <AnimationOnScroll  animateIn="animate__backInLeft">
                        <h2 className='text-history'>Vision</h2>
                      </AnimationOnScroll>
                      <AnimationOnScroll  animateIn="animate__backInLeft">
                        <p className='p-sobre'>Ser una organización líder en la creación e implementación de proyectos sociales sostenibles, que fomente la colaboración entre nuestras comunidades y nuestros voluntarios comprometidos con el cambio social.</p>
                      </AnimationOnScroll>
                    </div>
                </div>
                <div className="history-img">
                  <AnimationOnScroll  animateIn="animate__backInRight">
                    <div className="img img-3"></div>
                  </AnimationOnScroll>
                </div>
              </div>  
            </section>
        </div>
        </>
    )
}
