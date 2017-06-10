import React from 'react';

function Welcome() {
  return (
    <div className="slide">
      <div className="slide-header">
        ¡Hola, soy Newton!
      </div>
      <div className="slide-body slide-body-welcome">
        <div className="newton" />
        <div className="text">
          Bienvenido a tuniversidad.
          <br />
          Antes de comenzar, te haré un par de preguntas para saber más de ti. 
        </div>
      </div>
    </div>
  );
}

export default Welcome;
