import React, { Component } from 'react';
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
          <DatePicker
            handleChange={val => this.props.logChange(val)}
            date={this.state.birth_date}
          />
        </div>
      </div>
    );
  }
}

export default BirthDate;
