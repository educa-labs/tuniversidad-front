import React from 'react';
import CareerCard from './CareerCard';

const carrera = {
  id: 0,
  titulo: 'Arte',
  universidad: 'Pontifia Universidad Católica de Chile',
  ponderaciones: {
    nem: 20,
    ranking: 20,
    lenguaje: 30,
    matematicas: 20,
    historia: 10,
  },
  sistemaDeAdmision: {
    nombre: 'PSU',
    corte: 416,
  },
  year: 2016,
  area: 'Humanidades',
  duración: 12,
  vacantes: 150,
  arancel: 5200000,
  empleabilidad: 92,
  sueldo: 1200000,
};

function Results() {
  return (
    <div>
      <CareerCard career={carrera} />
    </div>
  );
}

export default Results;
