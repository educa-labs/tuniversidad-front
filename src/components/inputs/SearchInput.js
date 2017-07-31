import React, { PropTypes } from 'react';
import Search from 'material-ui/svg-icons/action/search';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';


const labelStyle = {
  color: '#C9C9C9',
  fontWeight: 300,
  padding: 0,
};


function SearchInput({ value, handleOnChange, handleSubmit, active, mobile, openFilters, clearSearch, afterSearch }) {
  const empty = mobile ? null : <div className="is-48x48" />;
  return (
    <div className={`search-input ${mobile ? 'search-input-mobile' : ''}`}>
      <form onSubmit={handleSubmit} className={`search-input-form ${mobile ? 'search-input-form-mobile' : ''}`}>
        <IconButton type="submit"><Search color="#C9C9C9" /></IconButton>
        <input
          className={mobile ? 'mobile' : ''}
          type="text"
          value={value}
          onChange={e => handleOnChange(e.target.value)}
          placeholder={active === 'university' ? 'Busca una universidad' : 'Busca una carrera'}
        />
        {afterSearch ? (
          <IconButton type="button" onClick={clearSearch}><CloseIcon color="#C9C9C9" /></IconButton>)
          : empty}
        {mobile && !afterSearch ? (
          <FlatButton
            type="button"
            onTouchTap={openFilters}
            labelStyle={labelStyle}
            label="Filtros"
          />
        ) : null}
      </form>
      {mobile ? null : (
        <RaisedButton
          label="buscar"
          secondary
          style={{
            margin: '0 10px',
          }}
          onTouchTap={handleSubmit}
        />
      )}
    </div>
  );
}

SearchInput.defaultProps = {
  mobile: false,
};

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  openFilters: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired,
  mobile: PropTypes.bool,
};

export default SearchInput;
