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

import '../styles/FirstSteps.css';

function getStepIndex(slideIndex) {
  if (is.inArray(slideIndex, [1, 2, 3, 4])) return 0;
  if (is.inArray(slideIndex, [5, 6])) return 1;
  if (is.inArray(slideIndex, [7, 8, 9, 10, 11])) return 2;
  return -1;
}

class FirstSteps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      slideIndex: 0,
      city_id: null,
    };
    this.handleBack = this.handleBack.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.logChange = this.logChange.bind(this);
  }

  handleNext() {
    const { slideIndex } = this.state;
    if (slideIndex < 11) {
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

  render() {
    const { slideIndex } = this.state;
    const steps = [
      <Welcome />,
      <City token={this.props.token} regions={this.props.regions} logChange={id => this.logChange('city_id', id)} />,
      <BirthDate logChange={date => this.logChange('birth_date', date)} />,
      <div key={0} className="step__slide">Hola</div>,
      <div key={1} className="step__slide">Chao</div>,
    ];
    return (
      <Dialog
        open
        modal
        contentStyle={{ width: '30rem' }}
        bodyStyle={{ padding: '0' }}
      >
        <div className="step">
          <div className="step__button">
            <IconButton onTouchTap={this.handleBack}>
              <LeftArrow color={is.inArray(slideIndex, [0, 1]) ? 'white' : 'black'} />
            </IconButton>
          </div>
          <div className="slide">
            <SwipeableViews index={slideIndex}>
              {steps}
            </SwipeableViews>
            {slideIndex > 0 ? (
              <Stepper activeStep={getStepIndex(slideIndex)}>
                <Step>
                  <StepLabel>Información</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Notas</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Crea un ensayo</StepLabel>
                </Step>
              </Stepper>
            ) : null }
          </div>
          <div className="step__button">
            <IconButton onTouchTap={this.handleNext}>
              <RigthArrow />
            </IconButton>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default FirstSteps;
