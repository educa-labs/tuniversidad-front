import React, { Component, PropTypes } from 'react';
import is from 'is_js';
import Request from 'superagent';
import capitalize from '../helpers/capitalize';
import SelectInput from './inputs/SelectInput';
import RangeInput from './inputs/RangeInput';
import '../styles/Fields.css';

const ciudades = [
  { value: 0, label: 'Todo' },
  { value: 1, label: 'Santiago' },
  { value: 2, label: 'La Serena' },
];

const yesNo = [
  { value: false, label: 'No' },
  { value: true, label: 'Sí' },
];

class Fields extends Component {
  componentWillMount() {
    this.setState({
      cities: [],
    });
  }
  render() {
    const { props } = this;
    if (!is.all.existy(props.fields.regions, props.fields.types, props.fields.schedules, props.fields.areas)) {
      return (
        <div>
          Cargando ...
        </div>
      );
    }
    const regions = props.fields.regions.map((reg) => {
      return { value: reg.id, label: reg.title };
    });
    const types = props.fields.types.map((type) => {
      return { value: type, label: capitalize(type) };
    });
    const schedules = props.fields.schedules.map((sch) => {
      return { value: sch, label: capitalize(sch) };
    });
    const areas = props.fields.areas.map((area) => {
      return { value: area, label: capitalize(area) };
    });
    if (props.type === 0) {
      return (
        <div className={`fields-container ${props.hide ? 'hide' : ''}`}>
          <SelectInput
            title="Region"
            items={regions}
            value={props.values.region}
            handleChange={region => props.changeFilterValue('region_id', region)}
          />
          <SelectInput
            title="Ciudad"
            items={ciudades}
            value={props.values.cities}
            handleChange={id => props.changeFilterValue('city_id', id)}
          />
          <SelectInput
            title="Tipo de Universidad"
            items={types}
            value={props.values.university_type}
            handleChange={type => props.changeFilterValue('university_type', type)}
          />
          <SelectInput
            title="Gratuidad"
            items={yesNo}
            value={props.values.freeness}
            handleChange={freeness => props.changeFilterValue('freeness', freeness)}
          />
        </div>
      );
    }

    return (
      <div className={`fields-container ${props.hide ? 'hide' : ''}`}>
        <SelectInput
          title="Region"
          items={regions}
          value={props.values.region}
          handleChange={region => props.changeFilterValue('region', region)}
        />
        <SelectInput
          title="Ciudad"
          items={ciudades}
          value={props.values.cities}
          handleChange={city => props.changeFilterValue('city_id', city)}
        />
        <SelectInput
          title="Area"
          items={areas}
          value={props.values.area}
          handleChange={area => props.changeFilterValue('area', area)}
        />
        <SelectInput
          title="Horario"
          items={schedules}
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
}

Fields.propTypes = {
  values: PropTypes.object,
  changeFilterValue: PropTypes.func.isRequired,
  hide: PropTypes.bool.isRequired,
  type: PropTypes.number.isRequired,
  fields: PropTypes.object,
};


export default Fields;
