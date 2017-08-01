import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectInput from '../inputs/SelectInput';

const items = [
  { label: 'Sí', value: 1 },
  { label: 'No', value: 2 },
];

class ThirdSlide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      preu: null,
    };
  }

  handlePhoneChange(val) {
    this.props.logPhoneChange(`+56${val}`);
    this.setState({ phone: val });
  }

  handlePreuChange(res) {
    this.setState({ preu: res });
    this.props.logPreuChange(res);
  }

  render() {
    return (
      <div className={`slide ${this.props.mobile ? 'slide-mobile' : ''}`}>
        <div className="slide-header">
          Cuéntanos más de ti
        </div>
        <div className={`col padding-${this.props.mobile ? '2' : '8'}`}>
          <TextField
            onChange={(e, val) => this.handlePhoneChange(val)}
            floatingLabelText="Teléfono"
            hintText="961403258"
            value={this.state.phone}
            errorText={this.props.error.phone || ''}
            fullWidth
          />
          <SelectInput
            title="Preuniversitario"
            items={items}
            value={this.state.preu}
            handleChange={res => this.handlePreuChange(res)}
          />
        </div>
      </div>
    );
  }
}

export default ThirdSlide;
