import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';
import NextButton from './NextButton';
import Modal from '../utility/Modal';


const Slides = props => (
  <div className="slides-container">
    <NextButton onClick={props.onBackClick} />
    <NextButton next onClick={props.onNextClick} />
    <Motion style={{ x: spring(-props.next * props.width) }}>
      {({ x }) => (
        <div
          className="tutorial-slides"
          style={{
            transform: `translate3d(${x}rem, 0, 0)`,
          }}
        >
          {Children.map(props.children, (child, index) => (
            <div
              className="tutorial-slide"
              style={{ visibility: props.current === index ? 'visible' : 'hidden' }}
            >
              {child}
            </div>
          ))}
        </div>
      )}
    </Motion>
  </div>
);


Slides.defaultProps = {
  width: 20,
};

Slides.propTypes = {
  onBackClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
  current: PropTypes.number.isRequired,
  next: PropTypes.number.isRequired,
  width: PropTypes.number,
};

export default Modal(Slides);
