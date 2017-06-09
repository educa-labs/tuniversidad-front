import React, { Component } from 'react';
import is from 'is_js';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import SwipeableViews from 'react-swipeable-views';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import RigthArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import LeftArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import Welcome from './slides/Welcome';

import '../styles/FirstSteps.css';

function getStepIndex(slideIndex) {
  if (is.inArray(slideIndex, [1, 2, 3, 4])) return 1;
  if (is.inArray(slideIndex, [5, 6])) return 2;
  if (is.inArray(slideIndex, [7, 8, 9, 10, 11])) return 3;
  return -1;
}

class FirstSteps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      slideIndex: 0,
    };
    this.handleBack = this.handleBack.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  handleNext() {
    const { slideIndex } = this.state;
    if (slideIndex < 11) {
      this.setState({ slideIndex: slideIndex + 1 });
    }
  }

  handleBack() {
    const { slideIndex } = this.state;
    if (slideIndex > 1) {
      this.setState({ slideIndex: slideIndex - 1 });
    }
  }

  render() {
    const { slideIndex } = this.state;
    const steps = [
      <Welcome />,
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
          <SwipeableViews index={slideIndex}>
            {steps}
          </SwipeableViews>
          <div className="step__button">
            <IconButton onTouchTap={this.handleNext}>
              <RigthArrow />
            </IconButton>
          </div>
        </div>
        {slideIndex === 1 ? (
          <Stepper activeStep={getStepIndex(slideIndex)} style={{ padding: '1rem' }}>
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
      </Dialog>
    );
  }
}

export default FirstSteps;
