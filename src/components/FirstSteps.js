import React, { Component } from 'react';
import is from 'is_js';
import SwipeableViews from 'react-swipeable-views';
import IconButton from 'material-ui/IconButton';
import RigthArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import LeftArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import Welcome from './slides/Welcome';
import City from './slides/City';
import BirthDate from './slides/BirthDate';
import Phone from './slides/Phone';
import Rut from './slides/Rut';
import Preu from './slides/Preu';
import Nem from './slides/Nem';
import Objectives from './slides/Objectives';
import Ready from './slides/Ready';
import Steps from './slides/Steps';

import { validateRut, validateDate, checkScore, validatePhone } from '../helpers/numeral';

import '../styles/FirstSteps.css';

function getStepIndex(slideIndex) {
  if (is.inArray(slideIndex, [1, 2, 3, 4])) return 0;
  if (is.inArray(slideIndex, [5, 6, 7])) return 1;
  if (is.inArray(slideIndex, [8])) return 3;
  return -1;
}

class FirstSteps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
      error: '',
      city_id: null,
      birth_date: null,
      phone: null,
      rut: null,
      preuniversity: null,
      nem: null,
      ranking: null,
      language: null,
      math: null,
      science: null,
      history: null,
    };
    this.getError = this.getError.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.logChange = this.logChange.bind(this);
    this.disabled = this.disabled.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getError(index) {
    return index === this.state.slideIndex ? this.state.error : '';
  }

  handleSubmit() {
    const { city_id, birth_date, phone, rut, preuniversity, nem, ranking } = this.state;
    const fields = Object.assign({}, {
      city_id,
      birth_date,
      phone,
      rut,
      preuniversity,
      nem,
      ranking,
      tutorial: true,
    });
    const { language, math, history, science } = this.state;
    this.props.updateUserInfo(this.props.user.id, this.props.token, fields);
    this.props.updateUserObjectives(this.props.token, language, math, history, science);
  }

  handleNext() {
    const { slideIndex } = this.state;
    console.log(slideIndex);
    const scoreError = 'Debes ingresar un puntaje válido';
    if (slideIndex < 8 && !this.disabled()) {
      if (slideIndex === 2) {
        if (!validateDate(this.state.birth_date)) {
          this.setState({ error: 'Esta fecha no existe' });
          return;
        }
      }
      if (slideIndex === 3) {
        if (!validatePhone(this.state.phone)) {
          this.setState({ error: 'Debes ingresar un número válido' });
          return;
        }
      }
      if (slideIndex === 4) {
        if (!validateRut(this.state.rut)) {
          this.setState({ error: 'Debes ingresar un rut válido' });
          return;
        }
      }
      if (slideIndex === 6) {
        const error = {};
        if (!checkScore(this.state.nem)) error.nem = scoreError;
        if (!checkScore(this.state.ranking)) error.ranking = scoreError;
        if (is.not.empty(error)) {
          this.setState({ error });
          return;
        }
      }
      if (slideIndex === 7) {
        const error = {};
        if (!checkScore(this.state.language)) error.language = scoreError;
        if (!checkScore(this.state.math)) error.math = scoreError;
        if (!checkScore(this.state.history) && this.state.history) error.history = scoreError;
        if (!checkScore(this.state.science) && this.state.science) error.science = scoreError;
        if (is.not.empty(error)) {
          this.setState({ error });
          return;
        }
      }
      this.setState({ slideIndex: slideIndex + 1, error: '' });
    }
  }

  handleBack() {
    const { slideIndex } = this.state;
    if (slideIndex > 0) {
      this.setState({ slideIndex: slideIndex - 1 });
    }
  }

  logChange(field, value) {
    if (is.inArray(field, ['nem', 'ranking', 'language', 'math', 'history', 'science'])) {
      this.setState({
        [field]: value,
        error: Object.assign({}, this.state.error, {
          [field]: '',
        }),
      });
    } else {
      this.setState({ [field]: value, error: '' });
    }
  }

  disabled() {
    const { slideIndex } = this.state;
    if (slideIndex === 1) return !this.state.city_id;
    if (slideIndex === 2) {
      if (!this.state.birth_date) return true;
      for (const s of this.state.birth_date.split('-')) {
        if (s === 'null') return true;
      }
      return false;
    }
    if (slideIndex === 3) return !this.state.phone;
    if (slideIndex === 4) return !this.state.rut;
    if (slideIndex === 5) return !this.state.preuniversity;
    if (slideIndex === 6) return !this.state.nem || !this.state.ranking;
    if (slideIndex === 7) return !this.state.language || !this.state.math || !(this.state.history || this.state.science);
    return false;
  }

  render() {
    const { slideIndex } = this.state;
    const { mobile } = this.props;
    return (
      <div className="first-steps-container">
        <div className="general-card row no-hover position-relative">
          <div className="step__button" onClick={this.handleBack}>
            <IconButton><LeftArrow color={is.inArray(slideIndex, [0]) ? '#FFFFFF' : '#9E9E9E'} /></IconButton>
          </div>
          <div className={`slide ${mobile ? 'slide-mobile' : ''}`}>
            <SwipeableViews
              index={slideIndex}
              disabled={this.disabled()}
              onChangeIndex={this.handleNext}
            >
              <Welcome mobile={mobile} />
              <City
                token={this.props.token}
                regions={this.props.regions}
                logChange={id => this.logChange('city_id', id)}
                mobile={mobile}
              />
              <BirthDate logChange={date => this.logChange('birth_date', date)} error={this.getError(2)} />
              <Phone logChange={phone => this.logChange('phone', phone)} error={this.getError(3)} />
              <Rut logChange={rut => this.logChange('rut', rut)} error={this.getError(4)} />
              <Preu logChange={preuniversity => this.logChange('preuniversity', preuniversity)} />
              <Nem
                logNemChange={val => this.logChange('nem', val)}
                logRankingChange={val => this.logChange('ranking', val)}
                error={this.getError(6)}
              />
              <Objectives
                logLangChange={val => this.logChange('language', val)}
                logMathChange={val => this.logChange('math', val)}
                logHistoryChange={val => this.logChange('history', val)}
                logScienceChange={val => this.logChange('science', val)}
                error={this.getError(7)}
              />
              <Ready onSubmit={this.handleSubmit} />
            </SwipeableViews>
          </div>
          {slideIndex > 0 ? <Steps activeStep={getStepIndex(slideIndex)} mobile={mobile}/> : null }
          <div className="step__button" onClick={this.handleNext}>
            <IconButton disabled={this.disabled()}><RigthArrow color={is.inArray(slideIndex, [8]) ? '#FFFFFF' : 'black'} /></IconButton>
          </div>
        </div>
      </div>
    );
  }
}

export default FirstSteps;
