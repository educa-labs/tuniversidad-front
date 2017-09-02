import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import is from 'is_js';
import SelectInput from '../inputs/SelectInput';
import RangeInput from '../inputs/RangeInput';
import Loading from '../Loading';
import { getCities } from '../../helpers/api';
import { capitalize } from '../../helpers/strings';

import { changeFilterValue } from '../../actions/filter';
import { CAREER, UNIVERSITY } from '../../constants/strings';

const all = { value: -1, label: 'Todas' };
const allM = { value: -1, label: 'Todos' };

const getOptions = (items) => {
  if (is.null(items)) return [];
  const result = items.map(item => ({
    value: item.id, label: capitalize(item.title),
  }));
  result.unshift(all);
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
      }}
      fullWidth
      maxHeight={180}
    />
  );

  const cityInput = (
    <SelectInput
      title={values.region === 13 ? 'Comuna' : 'Ciudad'}
      items={getOptions(props.cities)}
      value={values.cities}
      handleChange={id => props.changeFilterValue('cities', id)}
      fullWidth
    />
  );

  const cutInput = (
    <RangeInput
      title="Puntaje de corte"
      onChange={cut => props.changeFilterValue('cut', cut)}
      value={values.cut}
    />
  );

  if (active === CAREER) {
    return (
      <div>
        {regionInput}
        {cityInput}
        {cutInput}
      </div>
    );
  }
  return (
    <div>
      {regionInput}
    </div>
  );
}

Filters.propTypes = {
  active: PropTypes.string.isRequired,
  changeFilterValue: PropTypes.func.isRequired,
  getCities: PropTypes.func.isRequired,
  regions: PropTypes.array,
  values: PropTypes.shape({
    region: PropTypes.number,
    cities: PropTypes.number,
    cut: PropTypes.object,
  }).isRequired,
};

const stateToProps = state => ({
  regions: state.fetch.regions,
  cities: state.fetch.cities,
  active: state.filter.active,
  values: {
    region: state.filter.region_id,
    cities: state.filter.cities,
    cut: state.filter.cut,
  },
});

export default connect(stateToProps, {
  changeFilterValue,
})(Filters);
