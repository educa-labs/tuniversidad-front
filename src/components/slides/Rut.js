import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';

class Rut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rut: '',
    };
  }

  handleRutChange(val) {
    this.props.logChange(val);
    this.setState({ rut: val });
  }

  render() {
    return (
      <div className={`slide ${this.props.mobile ? 'slide-mobile' : ''}`}>
        <div className="slide-header">
          ¿Cuál es tu rut?
        </div>
        <div className={`col padding-${this.props.mobile ? '2' : '8'}`}>
          Con guión y sin puntos
          <TextField
            onChange={(e, val) => this.handleRutChange(val)}
            floatingLabelText="Rut"
            hintText="18918496-4"
            value={this.state.rut}
            errorText={this.props.error}
            fullWidth
          />
        </div>
      </div>
    );
  }
}

Rut.propTypes = {
  logChange: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

export default Rut;
