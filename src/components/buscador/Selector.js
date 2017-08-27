import React from 'react';
import PropTypes from 'prop-types';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { CAREER, UNIVERSITY } from '../../constants/strings';


const radioStyle = {
  marginTop: '10px',
  width: '49%',
};

function Selector({ active, onSelect }) {
  return (
    <RadioButtonGroup
      name="filter options"
      defaultSelected={active}
      onChange={(event, value) => onSelect(value)}
      style={{
        display: 'flex',
        width: '40%',
      }}
    >
      <RadioButton
        style={radioStyle}
        value={CAREER}
        label="Carreras"
      />
      <RadioButton
        style={radioStyle}
        value={UNIVERSITY}
        label="Universidades"
      />
    </RadioButtonGroup>
  );
}

Selector.propTypes = {
  active: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Selector;
