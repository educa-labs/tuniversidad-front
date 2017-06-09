import React, { Component } from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';


class FirstSteps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0,
    };
  }
  
  handleNext() {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  }

  handlePrev() {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return 'Select campaign settings...';
      case 1:
        return 'What is an ad group anyways?';
      case 2:
        return 'This is the bit I really care about!';
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  render() {
    const actions = [
      <FlatButton
        label="Atrás"
        onTouchTap={this.props.handleClose}
        style={styles.button}
        secondary
      />,
      <FlatButton
        label="Siguiente"
        onTouchTap={this.onSubmit}
        style={styles.button}
        secondary
        disabled={this.disabled()}
      />,
    ];
    return (
      <Dialog
        open
        modal
        actions={actions}
      >
        <Stepper activeStep={this.state.stepIndex}>
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
      </Dialog>
    );
  }
}

export default FirstSteps;
