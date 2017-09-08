import React from 'react';

function Welcome({ mobile }) {
  return (
    <div className={`slide ${mobile ? 'slide-mobile' : ''}`}>
      <div className="slide-header">¡Hola, soy Newton!</div>
      <div className="row">
        <div className="newton" />
        <div className={`welcome-text ${mobile ? 'welcome-text-mobile' : ''}`}>
          !Bienvenido a tuniversidad! Antes de comenzar, te haré un par de preguntas para saber más de ti.
        </div>
      </div>
    </div>
  );
}

export default Welcome;
