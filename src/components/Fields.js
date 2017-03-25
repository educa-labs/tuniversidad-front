import React, { Component, PropTypes } from 'react';
import SelectInput from './SelectInput';
import '../styles/Fields.css';

const tipos = [
  { value: 0, label: 'Todo' },
  { value: 1, label: 'Privada' },
  { value: 2, label: 'Estatal' },
];

const regiones = [
  { value: 0, label: 'Todo' },
  { value: 1, label: 'Metropolitana' },
  { value: 2, label: 'Coquimbo' },
];

const paises = [
  { value: 0, label: 'Todo' },
  { value: 1, label: 'Chile' },
  { value: 2, label: 'Argentina' },
];

const opciones = [
  { value: 0, label: 'Todo' },
  { value: 1, label: 'Si' },
  { value: 2, label: 'No' },
];

const idiomas = [
  { value: 0, label: 'Todo' },
  { value: 1, label: 'Español' },
  { value: 2, label: 'Inglés' },
];

function Fields(props) {
  if (props.type === 0) {
    return (
      <div className={`fields-container ${props.hide ? 'hide' : ''}`}>
        <SelectInput
          title="Pais"
          items={paises}
          value={props.values.country}
          handleChange={country => props.changeFilterValue('country', country)}
        />
        <SelectInput
          title="Region"
          items={regiones}
          value={props.values.region}
          handleChange={region => props.changeFilterValue('region', region)}
        />
        <SelectInput
          title="Tipo de Universidad"
          items={tipos}
          value={props.values.type}
          handleChange={type => props.changeFilterValue('type', type)}
        />
        <SelectInput
          title="Gratuidad"
          items={opciones}
          value={props.values.gratuity}
          handleChange={gratuity => props.changeFilterValue('gratuity', gratuity)}
        />
      </div>
    );
  }

  return (
    <div className={`fields-container ${props.hide ? 'hide' : ''}`}>
      <SelectInput
        title="Pais"
        items={paises}
        value={props.values.country}
        handleChange={country => props.changeFilterValue('country', country)}
      />
      <SelectInput
        title="Region"
        items={regiones}
        value={props.values.region}
        handleChange={region => props.changeFilterValue('region', region)}
      />
      <SelectInput
        title="Area"
        items={tipos}
        value={props.values.area}
        handleChange={area => props.changeFilterValue('area', area)}
      />
      <SelectInput
        title="Idioma"
        items={idiomas}
        value={props.values.language}
        handleChange={language => props.changeFilterValue('language', language)}
      />
    </div>
  );
}

Fields.propTypes = {
  values: PropTypes.object,
  changeFilterValue: PropTypes.func.isRequired,
  hide: PropTypes.bool.isRequired,
  type: PropTypes.number.isRequired,
};


export default Fields;
