import React from 'react';

function Welcome({ mobile }) {
  return (
    <div className={`slide ${mobile ? 'slide-mobile' : ''}`}>
      <div className="slide-header">¡Hola!</div>
      <div className="row">
        <div className={`welcome-text ${mobile ? 'welcome-text-mobile' : ''}`}>
          Gracias por ingresar a Tuniversidad, como equipo estamos muy agradecidos y quisieramos saber un poco más de ti.
        </div>
      </div>
    </div>
  );
}

export default Welcome;
