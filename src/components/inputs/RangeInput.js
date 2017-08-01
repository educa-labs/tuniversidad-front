import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import '../../styles/RangeInput.css';


class RangeInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      min: Number(this.props.minValue),
      max: Number(this.props.maxValue),
    };
  }

  logChange(val, extreme) {
    this.setState({ [extreme]: val === '' ? val : Number(val) }, () => (
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
