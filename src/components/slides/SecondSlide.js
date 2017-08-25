import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from '../inputs/DatePicker';

class SecondSlide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      birth_date: null,
      rut: '',
    };
  }

  handleRutChange(val) {
    this.setState({ rut: val });
    this.props.logRutChange(val);
  }

  render() {
    return (
      <div className={`slide ${this.props.mobile ? 'slide-mobile' : ''}`}>
        <div className="slide-header">
          ¿Cuándo naciste?
        </div>
        <div className={`col padding-${this.props.mobile ? '2' : '7'}`}>
          <DatePicker
            handleChange={val => this.props.logDateChange(val)}
            date={this.state.birth_date}
            errorText={this.props.error.date || ''}
          />
          <TextField
            onChange={(e, val) => this.handleRutChange(val)}
            floatingLabelText="Rut"
            hintText="18918496-4"
            value={this.state.rut}
            errorText={this.props.error.rut || ''}
            fullWidth
          />
          <div className="input-help">Ejemplo: 18918496-4</div>
        </div>
      </div>
    );
  }
}

export default SecondSlide;

