import React from 'react';
import Search from 'material-ui/svg-icons/action/search';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';

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
        {props.afterSearch ? (
          <IconButton
            type="button"
            onClick={props.clearSearch}
            style={{ margin: '0 1rem' }}
          >
            <CloseIcon color="#C9C9C9" />
          </IconButton>
        ) : (
          <FlatButton
            label="Filtros"
            type="button"
            labelStyle={{ color: '#0091EA' }}
            onClick={props.openFilters}
          />
        )}
        <input type="submit" style={{ display: 'none' }} />
      </form>
    </div>
  );
}

export default InputMobile;
