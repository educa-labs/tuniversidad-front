import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Fields from '../components/Fields';
import { setActiveFilter, changeFilterValue } from '../actions/filter';

const radioStyle = {
  margin: '0',
};

function FiltersDrawer(props) {
  const fields = {
    regions: props.regions || null,
    areas: props.areas ? props.areas.areas : null,
    schedules: props.schedules ? props.schedules.schedules : null,
    types: props.types ? props.types.university_types : null,
  };
  return (
      <div className="filters">
        <div className="filters__banner">FILTROS</div>
        <div className="filters__radio-input">
          <RadioButtonGroup
            name="filter options"
            defaultSelected={props.active}
            onChange={(event, value) => props.setActiveFilter(value)}
          >
            <RadioButton
              style={{ margin: '10px 0' }}
              value="university"
              label="Universidades"
            />
            <RadioButton
              style={{ margin: '10px 0' }}
              value="carreer"
              label="Carreras"
            />
          </RadioButtonGroup>
        </div>
        <Divider />
        <Fields
          type={0}
          hide={props.active === 'carreer'}
          values={props.universities}
          changeFilterValue={props.changeFilterValue}
          fields={fields}
        />
        <Fields // Careers
          type={1}
          hide={props.active === 'university'}
          values={props.careers}
          changeFilterValue={props.changeFilterValue}
          fields={fields}
        />
      </div >
  );
}

FiltersDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  active: PropTypes.string.isRequired,
  toggleFilters: PropTypes.func.isRequired,
  setActiveFilter: PropTypes.func.isRequired,
  changeFilterValue: PropTypes.func.isRequired,
};

function mapSatetToProps(state) {
  return {
    active: state.filter.active,
    universities: {
      university_type: state.filter.university_type,
      freeness: state.filter.freeness,
      cities: state.filter.cities,
      region: state.filter.region_id,
    },
    careers: {
      area: state.filter.area,
      cities: state.filter.cities,
      region: state.filter.region_id,
      duration: state.filter.duration,
      price: state.filter.price,
      cut: state.filter.cut,
      schedule: state.filter.schedule,
    },
    areas: state.fetch.areas,
    types: state.fetch.types,
    schedules: state.fetch.schedules,
    regions: state.fetch.regions,
  };
}

export default connect(mapSatetToProps, {
  setActiveFilter,
  changeFilterValue,
})(FiltersDrawer);
