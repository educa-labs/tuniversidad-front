import React, { PropTypes } from 'react';
import Search from 'material-ui/svg-icons/action/search';
import IconButton from 'material-ui/IconButton';
import FilterList from 'material-ui/svg-icons/content/filter-list';
import Paper from 'material-ui/Paper';
import '../../styles/SearchInput.css';


function SearchInput({ value, handleOnChange, onClick, compress, onFilterClick }) {
  return (
    <Paper zDepth={compress ? 2 : 0}>
      <div className="input-container" onClick={onClick}>
        <IconButton onTouchTap={onFilterClick}>
          <FilterList color="#C9C9C9" />
        </IconButton>
        <IconButton><Search color="#C9C9C9" /></IconButton>
        <input
          type="text"
          value={value}
          onChange={e => handleOnChange(e.target.value)}
          placeholder="Busca lo que quieras"
        />
      </div>
    </Paper>
  );
}

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  compress: PropTypes.bool.isRequired,
  onFilterClick: PropTypes.func.isRequired,
};

export default SearchInput;
