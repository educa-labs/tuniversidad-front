import React, { Component } from 'react';
import InputRange from 'react-input-range';
import TextField from 'material-ui/TextField';
import 'react-input-range/lib/css/index.css';
import '../../styles/RangeInput.css';


/*
title="Duración (semestres)"
          minValue={1}
          maxValue={16}
          onChange={duration => props.changeFilterValue('duration', duration)}
          value={props.values.duration}
          */
class RangeInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      min: this.props.minValue,
      max: this.props.maxValue,
    };
  }

  logChange(val, extreme) {
    this.setState({ [extreme]: val }, () => (
      this.props.onChange(this.state)
    ));
  }

  render() {
    return (
      <div className="col">
        <span className="range-input__title">{this.props.title}</span>
        <div className="row">
          <TextField
            type="number"
            floatingLabelText="Min"
            onChange={(e, val) => this.logChange(val, 'min')}
            className="margin-right"
            value={this.state.min}
          />
          <TextField
            type="number"
            floatingLabelText="Max"
            onChange={(e, val) => this.logChange(val, 'max')}
            className="margin-left"
            value={this.state.max}
          />
        </div>
      </div>
    );
  }
}

RangeInput.defaultProps = {
  custom: false,
  step: 1,
};

export default RangeInput;
