import React from 'react';
import { Link } from 'react-router';

const NewtonLeft = () => (
  <div className="newton-left">
    <div className="title">
      ¿No sabes que estudiar?
    </div>
    <div className="newton-body">
      <div className="newton-thinking" />
    </div>
    <div className="body">
      Soy Newton y creo que puedo ayudarte. soy una computadora que trabaja con <b>Inteligencia artificial</b> para guiar vocacionalmente a miles de estudiantes.
    </div>
    <Link to="/signup" className="footer">
      ¡Regístrate y pruebame!
    </Link>
  </div>
);

export default NewtonLeft;
