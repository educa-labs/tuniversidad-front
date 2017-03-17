import React, { Component } from 'react';
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import IconButton from 'material-ui/IconButton';
import '../styles/Filters.css';

const iconStyle = {
  marginLeft: '7rem',
};

class Filters extends Component {
  render() {
    return (
      <div className="filter-container">
        <div className="filter-banner">
          <IconButton className="icon-button">
            <ArrowDown color="white" />
          </IconButton>
          <span>Filtros</span>
        </div>
      </div>
    );
  }
}

export default Filters;
