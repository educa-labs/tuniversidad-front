import React, { PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import '../styles/SelectInput.css';

function SelectInput(props) {
  const labelStyle = {
    color: 'white',
  };
  const floatingLabelStyle = {
    color: 'white',
  };

  function renderItems(item, index) {
    return (
      <MenuItem
        value={item.value}
        primaryText={item.label}
        key={index}
      />
    );
  }
  function onChange(event, index, value) {
    props.handleChange(value);
  }
  return (
    <div className="select-input-container">
      <SelectField
        value={props.value}
        onChange={onChange}
        labelStyle={labelStyle}
        fullWidth
        floatingLabelText={props.title}
        floatingLabelStyle={floatingLabelStyle}
      >
        {props.items.map((item, index) => renderItems(item, index))}
      </SelectField>
    </div>
  );
}

SelectInput.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  value: PropTypes.number,
  handleChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

SelectInput.defaultProps = {
  value: 0,
};

export default SelectInput;
