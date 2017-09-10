import React from 'react';
import PropTypes from 'prop-types';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';

const Steps = ({ activeStep }) => (
  <Stepper activeStep={activeStep}>
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

Steps.propTypes = {
  activeStep: PropTypes.number.isRequired,
};

export default Steps;
