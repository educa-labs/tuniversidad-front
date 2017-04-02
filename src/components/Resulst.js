import React from 'react';
import ResultCard from './ResultCard';
import '../styles/Results.css';

const carrera = {
  id: 1,
  title: 'Arte',
  universidad: 'Pontifia Universidad Católica de Chile',
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

function Results() {
  return (
    <div className="result-container">
      <ResultCard career={carrera} />
      <ResultCard career={carrera} />
    </div>
  );
}

export default Results;
