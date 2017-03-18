import React, { Component, PropTypes } from 'react';
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import IconButton from 'material-ui/IconButton';
import '../styles/Filters.css';

class Filters extends Component {
  render() {
    const { expanded, onClick } = this.props;
    return (
      <div className={`filters-container ${expanded ? 'expand' : ''}`}>
        <div className="filter-banner">
          <IconButton className="icon-button" onTouchTap={onClick}>
            {expanded ?
              <ArrowUp color="white" /> :
              <ArrowDown color="white" />}
          </IconButton>
          <span>Filtros</span>
        </div>
      </div>
    );
  }
}

Filters.propTypes = {
  expanded: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Filters;
