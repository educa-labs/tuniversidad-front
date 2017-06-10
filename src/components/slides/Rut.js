import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

class Rut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rut: null,
    };
  }

  handleRutChange(val) {
    this.props.logChange(val);
    this.setState({ rut: val });
  }

  render() {
    return (
      <div className="slide">
        <div className="slide-header">
          ¿Cuál es tu rut?
        </div>
        <div className="slide-body">
          Con guión y sin puntos
          <div className="slide-field">
            <TextField
              onChange={(e, val) => this.handleRutChange(val)}
              floatingLabelText="Rut"
              hintText="18918496-4"
              value={this.state.rut}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Rut;