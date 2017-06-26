import React from 'react';

function NewtonSection(props) {
  if (props.mobile) {
    return (
      <div className="newton-section-mobile">
        <div className="newton-section-title-mobile color-white">
          Newton. Recomineda.
        </div>
        <div className="newton-section-text-mobile">
          Hola, soy Newton, una computadora diseñada por el equipo de Educalabs para ayudarte a encontrar tu carrera ideal. Estoy hecho a base de conocimientos previos entregados por cientos de estudiantes de diversas carreras y universidades.
          <br />
          <br />
          Si lo deseas, te haré unas cuantas preguntas. Compararé tus respuestas y tu comportamiento dentro de la plataforma, con lo que ya he aprendido de otros estudiantes para entregarte ayuda vocacional de calidad.
        </div>
      </div>
    );
  }
  return (
    <div className="newton-section">
      <div className="col col-1 justify-center align-center">
        <div className="newton-landing" />
      </div>
      <div className="col col-3 justify-center align-center">
        <div className="newton-section-title color-white">
          Newton. Recomienda.
        </div>
        <div className="newton-section-text">
          Hola, soy Newton, una computadora diseñada por el equipo de Educalabs para ayudarte a encontrar tu carrera ideal. Estoy hecho a base de conocimientos previos entregados por cientos de estudiantes de diversas carreras y universidades.
          <br />
          <br />
          Si lo deseas, te haré unas cuantas preguntas. Compararé tus respuestas y tu comportamiento dentro de la plataforma, con lo que ya he aprendido de otros estudiantes para entregarte ayuda vocacional de calidad.
        </div>
      </div>
    </div>
  );
}

export default NewtonSection;
