import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import ArrowFoward from 'material-ui/svg-icons/navigation/arrow-forward';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

const style = {
  backgroundColor: 'white',
  borderRadius: '50%',
};

const NextButton = ({ next, onClick, disabled }) => (
  <div className={next ? 'button next-button' : 'button back-button'}>
    <IconButton onTouchTap={onClick} style={style} disabled={disabled}>
      {next ? <ArrowFoward color="#0091EA" /> : <ArrowBack color="#0091EA" />}
    </IconButton>
  </div>
);

NextButton.defaultProps = {
  next: false,
  disabled: false,
};

NextButton.propTypes = {
  next: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default NextButton;

