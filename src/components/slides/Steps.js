import React, { PropTypes } from 'react';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';

const styles = {
  mobile: {
    transform: 'scale(0.85)',
    position: 'absolute',
    bottom: 0,
    left: -20,
    right: 0,
  },
  desktop: {
    position: 'absolute',
    bottom: 0,
    left: 76,
  },
};

function Steps(props) {
  return (
    <Stepper activeStep={props.activeStep} style={props.mobile ? styles.mobile : styles.desktop}>
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
