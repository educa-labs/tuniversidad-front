import React, { PropTypes } from 'react';
import Search from 'material-ui/svg-icons/action/search';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import FilterList from 'material-ui/svg-icons/content/filter-list';
import '../../styles/SearchInput.css';


function SearchInput({ value, handleOnChange, handleSubmit, active }) {
  return (
    <div className="search-input">
      <form onSubmit={handleSubmit}>
        <IconButton type="submit"><Search color="#C9C9C9" /></IconButton>
        <input
          type="text"
          value={value}
          onChange={e => handleOnChange(e.target.value)}
          placeholder={active === 'university' ? 'Busca una Universidad' : 'Busca una carrera'}
        />
      </form>
      <RaisedButton
        label="buscar"
        secondary
        style={{
          margin: '0 10px',
        }}
        onTouchTap={handleSubmit}
      />
    </div>
  );
}

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onFilterClick: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired,
};

export default SearchInput;
