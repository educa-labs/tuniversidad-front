import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { setActiveFilter, changeFilterValue } from '../actions/filter';
import { makeSubmit } from '../actions/search';
import Fields from '../components/Fields';
import NavigationBar from '../components/NavigationBar';
import Loading from '../components/Loading';


class FiltersMobile extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.props.makeSubmit();
    this.context.router.goBack();
  }

  render() {
    const { props } = this;
    const fields = {
      regions: props.regions || null,
      areas: props.areas || null,
      types: props.types || null,
      schedules: props.schedules ? props.schedules.schedules : null,
    };
    if (this.props.requesting) {
      return (
        <div className="fullscreen">
          <Loading />
        </div>
      );
    }
    return (
      <div>
        <NavigationBar location="filters" />
        <div className="filters__header">FILTROS</div>
        <Divider />
        <div className="row justify-center align-center">
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
        <div className="row justify-center">
          <RaisedButton
            onTouchTap={this.handleSubmit}
            label="Filtrar"
            backgroundColor="#616161"
            labelColor="#FFFFFF"
            labelStyle={{ fontSize: '11px' }}
            style={{ width: '5rem', marginBottom: '1rem' }}
          />
        </div>
      </div>
    );
  }
}

FiltersMobile.contextTypes = {
  router: PropTypes.object,
};

FiltersMobile.propTypes = {
  active: PropTypes.string.isRequired,
  setActiveFilter: PropTypes.func.isRequired,
  changeFilterValue: PropTypes.func.isRequired,
  makeSubmit: PropTypes.func.isRequired,
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
    requesting: state.search.requesting,
  };
}

export default connect(mapSatetToProps, {
  setActiveFilter,
  changeFilterValue,
  makeSubmit,
})(FiltersMobile);
