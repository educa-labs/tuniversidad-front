import React from 'react';
import PropTypes from 'prop-types';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';

const styles = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
};

const Steps = ({ activeStep, mobile }) => (
  <Stepper activeStep={activeStep} style={mobile ? null : null}>
    <Step>
      <StepLabel>{mobile ? '' : 'Información'}</StepLabel>
    </Step>
    <Step>
      <StepLabel>{mobile ? '' : 'Mi objetivo'}</StepLabel>
    </Step>
    <Step>
      <StepLabel>{mobile ? '' : 'Comenzar'}</StepLabel>
    </Step>
  </Stepper>
);

Steps.defaultProps = {
  mobile: false,
};

Steps.propTypes = {
  activeStep: PropTypes.number.isRequired,
  mobile: PropTypes.bool,
};

export default Steps;
