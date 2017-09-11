import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import is from 'is_js';
import { fetch } from '../../actions/fetch';
import { updateUserInfo } from '../../actions/user';
import { updateUserObjectives } from '../../actions/objectives';
import { capitalize } from '../../helpers/strings';
import { validateRut, validateDate, checkScore, validatePhone } from '../../helpers/numeral';
import { rutIsAviable } from '../../helpers/api';
import Slides from './Slides';
import Welcome from './Welcome';
import City from './City';
import SecondSlide from './SecondSlide';
import ThirdSlide from './ThirdSlide';
import Nem from './Nem';
import Objectives from './Objectives';
import Ready from './Ready';


const getOptions = (items) => {
  if (is.null(items)) return [];
  const result = items.map(item => ({
    value: item.id, label: capitalize(item.title),
  }));
  return result;
};

const getStepIndex = (current) => {
  if (current < 3) return 0;
  if (current < 6) return 1;
  return 2;
};

class FirstSteps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      next: 0,
      region: null,
      city_id: null,
      date: '',
      rut: '',
      preu: null,
      phone: '',
      nem: '',
      ranking: '',
      math: '',
      language: '',
      science: '',
      history: '',
      error: {},
    };
    this.handleBack = this.handleBack.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleRegionChange = this.handleRegionChange.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.getError = this.getError.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getError() {
    const { current, rut, date, phone, nem, ranking, language, math, science, history } = this.state;
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
      if (current === 5) {
        if (language && !checkScore(language)) error.language = scoreError;
        if (math && !checkScore(math)) error.math = scoreError;
        if (science && !checkScore(science)) error.science = scoreError;
        if (history && !checkScore(history)) error.history = scoreError;
      }
      if (is.not.empty(error)) reject(error);
      else resolve({});
    });
  }

  handleSubmit() {
    const fields = {
      city_id: this.state.city_id,
      birth_date: this.state.date,
      rut: this.state.rut,
      phone: `+56${this.state.phone}`,
      preuniversity: this.state.preu,
      nem: this.state.nem,
      ranking: this.state.ranking,
      tutorial: true,
    };
    this.props.updateUserInfo(this.props.userId, this.props.token, fields);
    const language = this.state.language || null;
    const math = this.state.math || null;
    const history = this.state.history || null;
    const science = this.state.science || null;
    this.props.updateUserObjectives(this.props.token, language, math, science, history);
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
    console.log('Hola');
    if (current < 7 && !this.disabled()) {
      console.log('Entramos');
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
        stepIndex={getStepIndex(this.state.current)}
        lastIndex={6}
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
        <Objectives
          handleHistoryChange={this.handleFieldChange('history')}
          handleLanguageChange={this.handleFieldChange('language')}
          handleMathChange={this.handleFieldChange('math')}
          handleScienceChange={this.handleFieldChange('science')}
          math={this.state.math}
          language={this.state.language}
          history={this.state.history}
          science={this.state.science}
          error={this.state.error}
        />
        <Ready handleSubmit={this.handleSubmit} />
      </Slides>
    );
  }
}

FirstSteps.propTypes = {
  fetch: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  updateUserInfo: PropTypes.func.isRequired,
  updateUserObjectives: PropTypes.func.isRequired,
};

const stateToProps = state => ({
  token: state.user.currentUser.auth_token,
  userId: state.user.currentUser.id,
  regions: state.fetch.regions,
  cities: state.fetch.cities,
});

export default connect(stateToProps, {
  fetch,
  updateUserInfo,
  updateUserObjectives,
})(FirstSteps);
