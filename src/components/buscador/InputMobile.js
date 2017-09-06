import React from 'react';
import PropTypes from 'prop-types';
import Search from 'material-ui/svg-icons/action/search';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';

function InputMobile(props) {
  return (
    <div className="search-input search-input-mobile">
      <form onSubmit={props.handleSubmit} className="search-input-form-mobile">
        <IconButton type="submit"><Search color="#424242" /></IconButton>
        <input
          type="text"
          className="text-field-mobile"
          value={props.value}
          onChange={e => props.handleOnChange(e.target.value)}
          placeholder={props.placeholder}
        />
        <FlatButton
          label="Filtros"
          type="button"
          labelStyle={{ color: '#0091EA' }}
          onClick={props.openFilters}
        />
        <input type="submit" style={{ display: 'none' }} />
      </form>
    </div>
  );
}

InputMobile.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  openFilters: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default InputMobile;
