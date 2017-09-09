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
import ThirdSlide from './ThirdSlide';
import Nem from './Nem';


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
      current: 4,
      next: 4,
      region: null,
      city_id: null,
      date: '',
      rut: '',
      preu: null,
      phone: '',
      nem: '',
      ranking: '',
      error: {},
    };
    this.handleBack = this.handleBack.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleRegionChange = this.handleRegionChange.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.getError = this.getError.bind(this);
  }

  getError() {
    const { current, rut, date, phone, nem, ranking } = this.state;
    const scoreError = 'Puntaje inválido';
    return new Promise((resolve, reject) => {
      const error = {};
      if (current === 2) {
        if (!validateRut(rut)) error.rut = 'Debes ingresar un rut válido';
        if (!validateDate(date)) error.date = 'Esta fecha no existe';
        if (is.empty(error)) return rutIsAviable(rut).then(resolve).catch(reject);
      }
      if (current === 3) {
        if (!validatePhone(phone)) error.phone = 'Debes ingresar un número válido';
      }
      if (current === 4) {
        if (!checkScore(nem)) error.nem = scoreError;
        if (!checkScore(ranking)) error.ranking = scoreError;
      }
      if (is.not.empty(error)) reject(error);
      else resolve({});
    });
  }

  disabled() {
    const { current } = this.state;
    if (current === 1) return !this.state.city_id;
    if (current === 2) return !this.state.date || !this.state.rut;
    if (current === 3) return !this.state.phone || !this.state.preu;
    if (current === 4) return !this.state.nem || !this.state.ranking;
    return false;
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
    if (current < 5 && !this.disabled()) {
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
        lastIndex={5}
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
        <ThirdSlide
          handlePhoneChange={this.handleFieldChange('phone')}
          handlePreuChange={this.handleFieldChange('preu')}
          phone={this.state.phone}
          preu={this.state.preu}
          error={this.state.error}
        />
        <Nem
          handleNemChange={this.handleFieldChange('nem')}
          handleRankingChange={this.handleFieldChange('ranking')}
          nem={this.state.nem}
          ranking={this.state.ranking}
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
