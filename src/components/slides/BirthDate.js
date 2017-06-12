import React, { Component, PropTypes } from 'react';
import DatePicker from '../inputs/DatePicker';

class BirthDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      birth_date: null,
    };
  }
  render() {
    return (
      <div className="slide">
        <div className="slide-header">
          ¿Cuándo naciste?
        </div>
        <div className="slide-body">
          <div className="slide-date-picker">
            <DatePicker
              handleChange={val => this.props.logChange(val)}
              date={this.state.birth_date}
              errorText={this.props.error}
            />
          </div>
        </div>
      </div>
    );
  }
}

BirthDate.propTypes = {
  logChange: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

export default BirthDate;
