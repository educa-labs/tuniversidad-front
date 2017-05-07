import React, { PropTypes } from 'react';
import Search from 'material-ui/svg-icons/action/search';
import IconButton from 'material-ui/IconButton';
import FilterList from 'material-ui/svg-icons/content/filter-list';
import '../../styles/SearchInput.css';


function SearchInput({ value, handleOnChange, handleSubmit, onFilterClick }) {
  return (
    <div className="input-container">
      <form onSubmit={handleSubmit}>
        <IconButton type="submit"><Search color="#C9C9C9" /></IconButton>
        <input
          type="text"
          value={value}
          onChange={e => handleOnChange(e.target.value)}
          placeholder="Busca lo que quieras"
        />
        <IconButton type="button" onTouchTap={onFilterClick}>
          <FilterList color="#C9C9C9" />
        </IconButton>
      </form>
    </div>
  );
}

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onFilterClick: PropTypes.func.isRequired,
};

export default SearchInput;
