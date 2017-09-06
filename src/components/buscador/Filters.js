import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import is from 'is_js';
import SelectInput from '../inputs/SelectInput';
import RangeInput from '../inputs/RangeInput';
import Loading from '../Loading';
import { makeSubmit } from '../../actions/search';
import { capitalize } from '../../helpers/strings';
import { changeFilterValue } from '../../actions/filter';
import { CAREER } from '../../constants/strings';

const all = { value: -1, label: 'Todas' };
const allM = { value: -1, label: 'Todos' };

const yesNo = [
  { value: 1, label: 'No' },
  { value: 2, label: 'Sí' },
  { value: -1, label: 'Todas' },
];

const getOptions = (items) => {
  if (is.null(items)) return [];
  const result = items.map(item => ({
    value: item.id, label: capitalize(item.title),
  }));
  result.unshift(all);
  return result;
};

const getSchedulesOptions = (items) => {
  const result = items.map(item => ({
    value: item, label: capitalize(item),
  }));
  result.unshift(allM);
  return result;
};

function Filters(props) {
  if (is.null(props.regions)) return <Loading />;

  const { values, active } = props;

  const regionInput = (
    <SelectInput
      title="Region"
      items={getOptions(props.regions)}
      value={values.region}
      handleChange={(region) => {
        props.changeFilterValue('region_id', region);
        props.getCities(region);
        props.makeSubmit();
      }}
      fullWidth
      maxHeight={300}
    />
  );

  const cityInput = (
    <SelectInput
      title={values.region === 13 ? 'Comuna' : 'Ciudad'}
      items={getOptions(props.cities)}
      value={values.cities}
      handleChange={(id) => {
        props.changeFilterValue('cities', id);
        props.makeSubmit();
      }}
      fullWidth
    />
  );


  if (active === CAREER) {
    return (
      <form onSubmit={props.makeSubmit}>
        <div className="filter-header">Filtros</div>
        {regionInput}
        {cityInput}
        <SelectInput
          title="Area"
          items={getOptions(props.areas)}
          value={values.area}
          handleChange={(area) => {
            props.changeFilterValue('area', area);
            props.makeSubmit();
          }}
          fullWidth
        />
        <SelectInput
          title="Horario"
          items={getSchedulesOptions(props.schedules)}
          value={values.schedule}
          handleChange={(schedule) => {
            props.changeFilterValue('schedule', schedule);
            props.makeSubmit();
          }}
          fullWidth
        />
        <RangeInput
          title="Puntaje de corte"
          onChange={cut => props.changeFilterValue('cut', cut)}
          value={values.cut}
        />
        <RangeInput
          title="Duración (semestres)"
          onChange={duration => props.changeFilterValue('duration', duration)}
          value={values.duration}
        />
        <RangeInput
          title="Arancel"
          onChange={price => props.changeFilterValue('price', price)}
          value={values.price}
        />
        <input type="submit" style={{ display: 'none' }} />
      </form>
    );
  }
  return (
    <form onSubmit={props.makeSubmit}>
      <div className="filter-header">Filtros</div>
      {regionInput}
      {cityInput}
      <SelectInput
        title="Tipo de Universidad"
        items={getOptions(props.types)}
        value={values.university_type}
        handleChange={(type) => {
          props.changeFilterValue('university_type', type);
          props.makeSubmit();
        }}
        fullWidth
      />
      <SelectInput
        title="Gratuidad"
        items={yesNo}
        value={values.freeness}
        handleChange={(freeness) => {
          props.changeFilterValue('freeness', freeness);
          props.makeSubmit();
        }}
        fullWidth
      />
      <input type="submit" style={{ display: 'none' }} />
    </form>
  );
}

Filters.propTypes = {
  active: PropTypes.string.isRequired,
  changeFilterValue: PropTypes.func.isRequired,
  makeSubmit: PropTypes.func.isRequired,
  getCities: PropTypes.func.isRequired,
  values: PropTypes.shape({
    area: PropTypes.number,
    region: PropTypes.number,
    cities: PropTypes.number,
    cut: PropTypes.object,
    duration: PropTypes.object,
    price: PropTypes.object,
  }).isRequired,
};

const stateToProps = state => ({
  regions: state.fetch.regions,
  cities: state.fetch.cities,
  areas: state.fetch.areas,
  types: state.fetch.types,
  schedules: state.fetch.schedules ? state.fetch.schedules.schedules : null,
  active: state.filter.active,
  values: {
    region: state.filter.region_id,
    cities: state.filter.cities,
    cut: state.filter.cut,
    duration: state.filter.duration,
    price: state.filter.price,
    area: state.filter.area,
    schedule: state.filter.schedule,
    university_type: state.filter.university_type,
    freeness: state.filter.freeness,
  },
});

export default connect(stateToProps, {
  changeFilterValue,
  makeSubmit,
})(Filters);
