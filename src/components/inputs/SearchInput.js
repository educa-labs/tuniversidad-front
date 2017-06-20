import React, { PropTypes } from 'react';
import Search from 'material-ui/svg-icons/action/search';
import FilterButton from 'material-ui/svg-icons/content/filter-list';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import '../../styles/SearchInput.css';


function SearchInput({ value, handleOnChange, handleSubmit, active, mobile, toggleFilters }) {
  return (
    <div className={`search-input ${mobile ? 'search-input-mobile' : ''}`}>
      <form onSubmit={handleSubmit} className="search-input-form">
        <IconButton type="submit"><Search color="#C9C9C9" /></IconButton>
        <input
          type="text"
          value={value}
          onChange={e => handleOnChange(e.target.value)}
          placeholder={active === 'university' ? 'Busca una universidad' : 'Busca una carrera'}
        />
        <IconButton type="button" onTouchTap={toggleFilters}>
          <FilterButton color="#C9C9C9" />
        </IconButton>
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
  toggleFilters: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired,
  mobile: PropTypes.bool,
};

export default SearchInput;
