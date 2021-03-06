import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import is from 'is_js';
import RaisedButton from 'material-ui/RaisedButton';
import SelectInput from '../inputs/SelectInput';
import RangeInput from '../inputs/RangeInput';
import NavigationBar from '../../components/NavigationBar';
import Loading from '../Loading';
import { fetch } from '../../actions/fetch';
import { makeSubmit } from '../../actions/search';
import { capitalize, getOptions } from '../../helpers/strings';
import { changeFilterValue } from '../../actions/filter';
import { CAREER } from '../../constants/strings';

const allM = { value: -1, label: 'Todos' };

const yesNo = [
  { value: 1, label: 'No' },
  { value: 2, label: 'Sí' },
  { value: -1, label: 'Todas' },
];

const getSchedulesOptions = (items) => {
  const result = items.map(item => ({
    value: item, label: capitalize(item),
  }));
  result.unshift(allM);
  return result;
};

function Filters(props, context) {
  if (is.null(props.regions)) return <Loading />;

  const handleSubmit = (e) => {
    e.preventDefault();
    props.makeSubmit();
    if (props.mobile) context.router.goBack();
  };
  
  const { values, active, mobile } = props;

  const regionInput = (
    <SelectInput
      title="Region"
      items={getOptions(props.regions)}
      value={values.region}
      handleChange={(region) => {
        props.changeFilterValue('region_id', region);
        if (!props.mobile) props.makeSubmit();
      }}
      fullWidth
      maxHeight={300}
    />
  );

  const body = active === CAREER ? (
    <div>
      <SelectInput
        title="Universidad"
        items={getOptions(props.universities)}
        value={values.university}
        handleChange={(univ) => {
          props.changeFilterValue('university_id', univ);
          if (!props.mobile) props.makeSubmit();
        }}
        fullWidth
      />
      <SelectInput
        title="Area"
        items={getOptions(props.areas)}
        value={values.area}
        handleChange={(area) => {
          props.changeFilterValue('area', area);
          if (!props.mobile) props.makeSubmit();
        }}
        fullWidth
      />
      <SelectInput
        title="Horario"
        items={getSchedulesOptions(props.schedules)}
        value={values.schedule}
        handleChange={(schedule) => {
          props.changeFilterValue('schedule', schedule);
          if (!props.mobile) props.makeSubmit();
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
    </div>
  ) : (
    <div>
      <SelectInput
        title="Tipo de Universidad"
        items={getOptions(props.types)}
        value={values.university_type_id}
        handleChange={(type) => {
          props.changeFilterValue('university_type_id', type);
          if (!props.mobile) props.makeSubmit();
        }}
        fullWidth
      />
      <SelectInput
        title="Gratuidad"
        items={yesNo}
        value={values.freeness}
        handleChange={(freeness) => {
          props.changeFilterValue('freeness', freeness);
          if (!props.mobile) props.makeSubmit();
        }}
        fullWidth
      />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className={mobile ? 'filters-mobile' : ''}>
      {mobile ? <NavigationBar title="Filtros" location="filters" /> : null}
      {mobile ? null : <div className="filter-header">Filtros</div>}
      {regionInput}
      {body}
      <input type="submit" style={{ display: 'none' }} />
      {mobile ? (
        <RaisedButton
          type="submit"
          label="Aplicar filtros"
          backgroundColor="#616161"
          labelColor="#FFFFFF"
          labelStyle={{ fontSize: '11px' }}
          fullWidth
        />
      ) : null }
    </form>
  );
}

Filters.contextTypes = {
  router: PropTypes.object,
};

Filters.defaultProps = {
  mobile: false,
};

Filters.propTypes = {
  active: PropTypes.string.isRequired,
  changeFilterValue: PropTypes.func.isRequired,
  makeSubmit: PropTypes.func.isRequired,
  mobile: PropTypes.bool,
  fetch: PropTypes.func.isRequired,
  values: PropTypes.shape({
    area: PropTypes.number,
    university: PropTypes.number,
    region: PropTypes.number,
    cities: PropTypes.number,
    cut: PropTypes.object,
    duration: PropTypes.object,
    price: PropTypes.object,
  }).isRequired,
};

const stateToProps = state => ({
  token: state.user.currentUser ? state.user.currentUser.auth_token : null,
  regions: state.fetch.regions,
  cities: state.fetch.cities,
  universities: state.fetch.universities,
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
    university_type_id: state.filter.university_type_id,
    university: state.filter.university_id,
    freeness: state.filter.freeness,
  },
});

export default connect(stateToProps, {
  changeFilterValue,
  makeSubmit,
  fetch,
})(Filters);
