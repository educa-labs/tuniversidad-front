import React, { PropTypes } from 'react';


function PinSlider({ maxValue, minValue, currentValue, handleClick, step }) {
  const len = ((maxValue - minValue) / step) + 1;
  const width = `${Math.round(100 * (100 / len)) / 100}%`;
  const toIndex = value => Number((value - minValue) / step);
  const toValue = index => (index * step) + minValue;
  const renderBox = index => (
    <div
      className={`pin-box ${index === toIndex(currentValue) ? 'selected' : ''}`}
      onClick={() => handleClick(toValue(index))}
      style={{ width }}
      key={index}
    >
      {index === toIndex(currentValue) ? currentValue : null}
    </div>
  );
  const boxes = [];
  for (let i = 0; i < len; i += 1) {
    boxes.push(renderBox(i));
  }
  return (
    <div className="pin-slider">
      {boxes}
    </div>
  );
}

PinSlider.propTypes = {
  handleClick: PropTypes.func.isRequired,
  currentValue: PropTypes.number.isRequired,
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
};

export default PinSlider;
