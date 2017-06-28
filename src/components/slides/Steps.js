import React, { PropTypes } from 'react';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';

const styles = {
  stepper: {
    transform: 'scale(0.8)',
    position: 'absolute',
    bottom: 0,
    left: -32,
  },
};

function Steps(props) {
  return (
    <Stepper activeStep={props.activeStep} style={styles.stepper}>
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
  );
}

Steps.propTypes = {
  activeStep: PropTypes.number.isRequired,
};

export default Steps;
