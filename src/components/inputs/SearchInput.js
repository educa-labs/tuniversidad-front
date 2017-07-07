import React, { PropTypes } from 'react';
import Search from 'material-ui/svg-icons/action/search';
import FilterButton from 'material-ui/svg-icons/content/filter-list';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';


function SearchInput({ value, handleOnChange, handleSubmit, active, mobile, openFilters }) {
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
        {mobile ? (
          <IconButton type="button" onTouchTap={openFilters}>
            <FilterButton color="#C9C9C9" />
          </IconButton>
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
}

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  openFilters: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired,
  mobile: PropTypes.bool,
};

export default SearchInput;
