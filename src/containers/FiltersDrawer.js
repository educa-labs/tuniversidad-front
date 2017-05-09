import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Fields from '../components/Fields';
import { setActiveFilter, changeFilterValue } from '../actions/filter';

function FiltersDrawer(props) {
  return (
    <Drawer
      docked={false}
      open={props.open}
      openSecondary
      width={300}
      onRequestChange={() => props.toggleFilters()}
    >
      <div className="filters-drawer">
        <div className="banner">
          FILTROS
        </div>
        <div className="radio-input">
          <RadioButtonGroup
            name="filter options"
            defaultSelected={props.active}
            onChange={(event, value) => props.setActiveFilter(value)}
          >
            <RadioButton
              style={{ margin: '1rem 0' }}
              value="university"
              label="Universidades"
            />
            <RadioButton
              style={{ margin: '1rem 0' }}
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
        />
        <Fields
          type={1}
          hide={props.active === 'university' || !props.open}
          values={props.careers}
          changeFilterValue={props.changeFilterValue}
        />
      </div >
    </Drawer >
  );
}

FiltersDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  active: PropTypes.string.isRequired,
  toggleFilters: PropTypes.func.isRequired,
  setActiveFilter: PropTypes.func.isRequired,
  changeFilterValue: PropTypes.func.isRequired,
  universities: PropTypes.shape({
    region: PropTypes.number.isRequired,
    city: PropTypes.number.isRequired,
    gratuity: PropTypes.number.isRequired,
    type: PropTypes.number.isRequired,
  }).isRequired,
  careers: PropTypes.shape({
    region: PropTypes.number.isRequired,
    city: PropTypes.number.isRequired,
    area: PropTypes.number.isRequired,
    duration: PropTypes.arrayOf(PropTypes.number).isRequired,
    tariff: PropTypes.arrayOf(PropTypes.number).isRequired,
    cut: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
};

function mapSatetToProps(state) {
  return {
    active: state.filter.active,
    universities: {
      type: state.filter.type,
      gratuity: state.filter.gratuity,
      city: state.filter.city,
      region: state.filter.region,
    },
    careers: {
      area: state.filter.area,
      city: state.filter.city,
      region: state.filter.region,
      duration: state.filter.duration,
      tariff: state.filter.tariff,
      cut: state.filter.cut,
      schedule: state.filter.schedule,
    },
  };
}

export default connect(mapSatetToProps, {
  setActiveFilter,
  changeFilterValue,
})(FiltersDrawer);
