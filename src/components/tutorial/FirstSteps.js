import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import is from 'is_js';
import { fetch } from '../../actions/fetch';
import { capitalize } from '../../helpers/strings';
import { validateRut, validateDate, checkScore, validatePhone } from '../../helpers/numeral';
import { rutIsAviable } from '../../helpers/api';
import Slides from './Slides';
import Welcome from './Welcome';
import City from './City';
import SecondSlide from './SecondSlide';


const getOptions = (items) => {
  if (is.null(items)) return [];
  const result = items.map(item => ({
    value: item.id, label: capitalize(item.title),
  }));
  return result;
};

class FirstSteps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 2,
      next: 2,
      region: null,
      city_id: null,
      date: '',
      rut: '',
      error: {},
    };
    this.handleBack = this.handleBack.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleRegionChange = this.handleRegionChange.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.getError = this.getError.bind(this);
  }

  disabled() {
    const { current } = this.state;
    if (current === 1) return !this.state.city_id;
    // if (current === 2) return !this.state.date || !this.state.rut;
    return false;
  }

  getError() {
    const { current, rut, date } = this.state;
    return new Promise((resolve, reject) => {
      const error = {};
      if (current === 2) {
        if (!validateRut(rut)) error.rut = 'Debes ingresar un rut válido';
        if (!validateDate(date)) error.date = 'Esta fecha no existe';
        if (is.not.empty(error)) reject(error);
        return rutIsAviable(rut).then(resolve).catch(reject);
      }
      resolve({});
    });
  }

  handleBack() {
    const { current, next } = this.state;
    if (current > 0) {
      this.setState({ next: next - 1 });
      setTimeout(() => {
        this.setState({ current: current - 1 });
      }, 300);
    }
  }
  handleNext() {
    const { current, next } = this.state;
    if (current < 3 && !this.disabled()) {
      this.getError()
        .then(() => {
          this.setState({
            current: current + 1,
            next: next + 1,
          });
        })
        .catch(error => this.setState({ error }));
    }
  }

  handleFieldChange(field) {
    return (value) => {
      const error = Object.assign(this.state.error);
      delete error[field];
      this.setState({ [field]: value, error });
    };
  }
  handleRegionChange(region) {
    this.setState({ region });
    this.props.fetch('cities', region, this.props.token);
  }

  render() {
    return (
      <Slides
        current={this.state.current}
        next={this.state.next}
        lastIndex={3}
        onBackClick={this.handleBack}
        onNextClick={this.handleNext}
        disabled={this.disabled()}
      >
        <Welcome />
        <City
          region={this.state.region}
          city={this.state.city_id}
          regions={getOptions(this.props.regions)}
          cities={getOptions(this.props.cities)}
          handleRegionChange={this.handleRegionChange}
          handleCityChange={this.handleFieldChange('city_id')}
        />
        <SecondSlide
          handleDateChange={this.handleFieldChange('date')}
          handleRutChange={this.handleFieldChange('rut')}
          rut={this.state.rut}
          date={this.state.date}
          error={this.state.error}
        />
        <p>Segundo</p>
        <p>Tercero</p>
      </Slides>
    );
  }
}

FirstSteps.propTypes = {
  fetch: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

const stateToProps = state => ({
  token: state.user.currentUser.auth_token,
  regions: state.fetch.regions,
  cities: state.fetch.cities,
});

export default connect(stateToProps, {
  fetch,
})(FirstSteps);
