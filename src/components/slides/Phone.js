import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

class Phone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: null,
    };
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
              onChange={(e, val) => this.props.logChange(val)}
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
