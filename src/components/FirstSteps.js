import React, { Component } from 'react';
import is from 'is_js';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import SwipeableViews from 'react-swipeable-views';
import Dialog from 'material-ui/Dialog';
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
      slideIndex: 3,
    };
    this.handleBack = this.handleBack.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.logChange = this.logChange.bind(this);
    this.disabled = this.disabled.bind(this);
  }

  handleNext() {
    const { slideIndex } = this.state;
    if (slideIndex < 8 && !this.disabled()) {
      this.setState({ slideIndex: slideIndex + 1 });
    }
  }

  handleBack() {
    const { slideIndex } = this.state;
    if (slideIndex > 0) {
      this.setState({ slideIndex: slideIndex - 1 });
    }
  }

  logChange(field, value) {
    this.setState({ [field]: value });
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
    if (slideIndex === 5) return !this.state.preu;
    if (slideIndex === 6) return !this.state.nem || !this.state.ranking;
    if (slideIndex === 7) return !this.state.language || !this.state.math || !(this.state.history || this.state.sciene);
    return false;
  }

  render() {
    const { slideIndex } = this.state;
    return (
      <Dialog
        open
        modal
        contentStyle={{ width: '34rem' }}
        bodyStyle={{ padding: '0' }}
        overlayStyle={{ opacity: '0.95', backgroundColor: 'black' }}
      >
        <div className="step">
          <div className="step__button" onClick={this.handleBack}>
            <IconButton>
              <LeftArrow color={is.inArray(slideIndex, [0]) ? 'white' : '#9E9E9E'} />
            </IconButton>
          </div>
          <div className="slide">
            <SwipeableViews index={slideIndex}>
              <Welcome />
              <City token={this.props.token} regions={this.props.regions} logChange={id => this.logChange('city_id', id)} />
              <BirthDate logChange={date => this.logChange('birth_date', date)} />
              <Phone logChange={phone => this.logChange('phone', phone)} />
              <Rut logChange={rut => this.logChange('rut', rut)} />
              <Preu logChange={preuniversity => this.logChange('preuniversity', preuniversity)} />
              <Nem
                logNenChange={val => this.logChange('nem', val)}
                logRankingChange={val => this.logChange('ranking', val)}
              />
              <Objectives
                logLangChange={val => this.logChange('language', val)}
                logMathChange={val => this.logChange('math', val)}
                loghistoryChange={val => this.logChange('history', val)}
                logScienceChange={val => this.logChange('science', val)}
              />
              <Ready />
            </SwipeableViews>
            {slideIndex > 0 ? (
              <Stepper activeStep={getStepIndex(slideIndex)}>
                <Step>
                  <StepLabel>Información</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Mi objetivo</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Comenzar</StepLabel>
                </Step>
              </Stepper>
            ) : null }
          </div>
          <div className="step__button" onClick={this.handleNext}>
            <IconButton disabled={this.disabled()}>
              <RigthArrow color={is.inArray(slideIndex, [8]) ? 'white' : 'black'} />
            </IconButton>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default FirstSteps;
