import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';
import FlatButton from 'material-ui/FlatButton';
import NextButton from './NextButton';
import Modal from '../utility/Modal';
import Steps from './Steps';
import './Slides.css';

const proptypes = {
  onBackClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
  lastIndex: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  next: PropTypes.number.isRequired,
  width: PropTypes.number,
  disabled: PropTypes.bool.isRequired,
  stepIndex: PropTypes.number.isRequired,
};

const Slides = (props) => {
  const handleEnterKey = (event) => {
    if (event.keyCode === 13) props.onNextClick();
  };
  return (
    <div className="slides-container" tabIndex="-1" onKeyDown={handleEnterKey} >
      {props.current > 0 ? (
        <NextButton onClick={props.onBackClick} />
      ) : null}
      {props.current < props.lastIndex ? (
        <NextButton next onClick={props.onNextClick} disabled={props.disabled} />
      ) : null}
      <Motion style={{ x: spring(-props.next * props.width) }}>
        {({ x }) => (
          <div
            className="tutorial-slides"
            style={{
              transform: `translate3d(${x}rem, 0, 0)`,
            }}
          >
            {Children.map(props.children, (child, index) => (
              <div className="tutorial-slide">
                {props.current === index ? child : null}
              </div>
            ))}
          </div>
        )}
      </Motion>
      <Steps activeStep={props.stepIndex}></Steps>
    </div>
  );
};


Slides.defaultProps = {
  width: 25,
};

Slides.propTypes = proptypes;

const SlidesMobile = props => (
  <div className="slides-container-mobile">
    <Motion style={{ x: spring(-props.next * 100) }}>
      {({ x }) => (
        <div
          className="tutorial-slides-mobile"
          style={{
            transform: `translate3d(${x}vw, 0, 0)`,
          }}
        >
          {Children.map(props.children, child => (
            <div className="tutorial-slide-mobile">
              {child}
            </div>
          ))}
        </div>
      )}
    </Motion>
    <div className="row end">
      <FlatButton
        label="Atrás"
        onTouchTap={props.onBackClick}
        secondary
      />
      <FlatButton
        label="Siguiente"
        onTouchTap={props.onNextClick}
        secondary
        disabled={props.disabled}
      />
    </div>
    <Steps activeStep={props.stepIndex} mobile />
  </div>
);

export default Modal(Slides, SlidesMobile);
