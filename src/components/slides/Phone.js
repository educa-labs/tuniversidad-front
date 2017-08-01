import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';

class Phone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
    };
  }
  handlePhoneChange(val) {
    this.props.logChange(val);
    this.setState({ phone: val });
  }

  render() {
    return (
      <div className={`slide ${this.props.mobile ? 'slide-mobile' : ''}`}>
        <div className="slide-header">
          ¿Cuál es tu número de teléfono?
        </div>
        <div className={`col padding-${this.props.mobile ? '2' : '8'}`}>
          <TextField
            onChange={(e, val) => this.handlePhoneChange(val)}
            floatingLabelText="Teléfono"
            hintText="+56961403258"
            value={this.state.phone}
            errorText={this.props.error}
            fullWidth
          />
        </div>
      </div>
    );
  }
}

Phone.propTypes = {
  logChange: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

export default Phone;
