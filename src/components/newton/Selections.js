import React from 'react';
import Recomendation from './Recomendation';

const Selections = ({ careers }) => (
  <section className="newton-fullscreen">
    <div className="col col-3 padding-2">
      <div className="search-feedback">Te recomiendo</div>
      {careers.slice(0, 3).map(car => (
        <Recomendation key={car.id} career={car} />
      ))}
    </div>
    <div className="col padding-2">
      <div className="title">¡Eureka!</div>
      <p>
      Ahora debes marcar si las carreras recomendadas son de tu interés o no. De esta forma aprenderé más de ti y te podré recomendar de forma más precisa en el futuro.
      </p>
    </div>
  </section>
);

export default Selections;
