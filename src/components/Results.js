import React, { PropTypes }from 'react';
import is from 'is_js';
import '../styles/Results.css';

const carrera = {
  id: 1,
  title: 'Arte',
  universidad: 'Pontificia Universidad Católica de Chile',
  university_id: 1,
  admision: {
    weights: {
      nem: 20,
      ranking: 20,
      lenguaje: 30,
      matematicas: 20,
      historia: 10,
    },
    system: {
      name: 'PSU',
      cut: 416,
    },
  },
  info: {
    year: 2016,
    area: 'Humanidades',
    duration: 12,
    slots: 150,
    tariff: 5200000,
    employability: 92,
    salary: 1200000,
  },
};

function Results(props) {
  console.log(props);
  if (is.null(props.result)) {
    return (
      <div>Escribe algo para comenzar la búsqueda</div>
    );
  }
  if (props.requesting) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  if (is.empty(props.result)) {
    return (
      <div>No hay resultados</div>
    );
  }
  return (
    <div className="result-container">
      {this.props.results.map(uni => uni.title)}
    </div>
  );
}

Results.propTypes = {
  result: PropTypes.oneOf(null, PropTypes.array),
  requesting: PropTypes.bool.isRequired,
};

export default Results;
