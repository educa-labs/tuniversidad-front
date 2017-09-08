import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import ArrowFoward from 'material-ui/svg-icons/navigation/arrow-forward';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

const style = {
  backgroundColor: 'white',
  borderRadius: '50%',
};

const NextButton = ({ next, onClick }) => (
  <div className={next ? 'button next-button' : 'button back-button'}>
    <IconButton onTouchTap={onClick} style={style}>
      {next ? <ArrowFoward /> : <ArrowBack />}
    </IconButton>
  </div>
);

NextButton.defaultProps = {
  next: false,
};

NextButton.propTypes = {
  next: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default NextButton;

