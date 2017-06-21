import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Fields from '../components/Fields';
import { setActiveFilter, changeFilterValue } from '../actions/filter';

class FiltersDrawer extends Component {
  render() {
    const { props } = this;
    const fields = {
      regions: props.regions || null,
      areas: props.areas || null,
      types: props.types || null,
      schedules: props.schedules ? props.schedules.schedules : null,
    };
    return (
        <Drawer
          docked={!this.props.mobile}
          open={this.props.mobile ? this.props.open : true}
          onRequestChange={this.props.onRequestChange}
          containerClassName="filters"
          openSecondary
        >
          <div className="filters__header">FILTROS</div>
          <Divider />
          <div className="filters__body">
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
          {props.active === 'university' ? (
            <Fields
              type={0}
              values={props.universities}
              changeFilterValue={props.changeFilterValue}
              fields={fields}
            />
          ) : null}
          {props.active === 'carreer' ? (
            <Fields // Careers
              type={1}
              values={props.careers}
              changeFilterValue={props.changeFilterValue}
              fields={fields}
            />
          ) : null}
        </Drawer >
    );
  }
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
