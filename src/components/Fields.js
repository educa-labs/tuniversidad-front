import React, { PropTypes } from 'react';
import SelectInput from './inputs/SelectInput';
import RangeInput from './inputs/RangeInput';
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

const ciudades = [
  { value: 0, label: 'Todo' },
  { value: 1, label: 'Santiago' },
  { value: 2, label: 'La Serena' },
];

const opciones = [
  { value: 0, label: 'Todo' },
  { value: 1, label: 'Si' },
  { value: 2, label: 'No' },
];


function Fields(props) {
  if (props.type === 0) {
    return (
      <div className={`fields-container ${props.hide ? 'hide' : ''}`}>
        <SelectInput
          title="Region"
          items={regiones}
          value={props.values.region}
          handleChange={region => props.changeFilterValue('region', region)}
        />
        <SelectInput
          title="Ciudad"
          items={ciudades}
          value={props.values.city}
          handleChange={city => props.changeFilterValue('city', city)}
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
        title="Region"
        items={regiones}
        value={props.values.region}
        handleChange={region => props.changeFilterValue('region', region)}
      />
      <SelectInput
        title="Ciudad"
        items={ciudades}
        value={props.values.city}
        handleChange={city => props.changeFilterValue('city', city)}
      />
      <SelectInput
        title="Area"
        items={tipos}
        value={props.values.area}
        handleChange={area => props.changeFilterValue('area', area)}
      />
      <SelectInput
        title="Horario"
        items={tipos}
        value={props.values.schedule}
        handleChange={schedule => props.changeFilterValue('schedule', schedule)}
      />
      <RangeInput
        title="Duración (semestres)"
        minValue={1}
        maxValue={14}
        onChange={duration => props.changeFilterValue('duration', duration)}
        hide={props.hide}
      />
      <RangeInput
        title="Arancel"
        minValue={0}
        maxValue={7000000}
        step={100000}
        onChange={tariff => props.changeFilterValue('tariff', tariff)}
        hide={props.hide}
        custom
      />
      <RangeInput
        title="Puntaje de corte"
        minValue={450}
        maxValue={850}
        step={10}
        onChange={cut => props.changeFilterValue('cut', cut)}
        hide={props.hide}
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
