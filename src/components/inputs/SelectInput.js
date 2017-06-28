import React, { PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
// import '../../styles/SelectInput.css';

function SelectInput(props) {
  function renderItems(item, index) {
    return (
      <MenuItem
        value={item.value || item.id}
        primaryText={item.label || item.title}
        key={index}
      />
    );
  }
  function onChange(event, index, value) {
    props.handleChange(value);
  }
  const { value, handleChange, title, items, ...other } = props;
  return (
    <SelectField
      value={value}
      onChange={onChange}
      fullWidth
      floatingLabelText={title}
      {...other}
    >
      {items.map((item, index) => renderItems(item, index))}
    </SelectField>
  );
}

SelectInput.propTypes = {
  value: PropTypes.number,
  handleChange: PropTypes.func.isRequired,
};

SelectInput.defaultProps = {
  value: 0,
};

export default SelectInput;
