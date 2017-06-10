import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

class Phone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: null,
    };
  }
  handlePhoneChange(val) {
    this.props.logChange(val);
    this.setState({ phone: val });
  }

  render() {
    return (
      <div className="slide">
        <div className="slide-header">
          ¿Cuál es tu número de teléfono?
        </div>
        <div className="slide-body">
          <div className="slide-field">
            <TextField
              onChange={(e, val) => this.handlePhoneChange(val)}
              floatingLabelText="Teléfono"
              hintText="+56961403258"
              value={this.state.phone}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Phone;
