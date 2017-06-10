import React, { Component } from 'react';
import SelectInput from '../inputs/SelectInput';

const items = [
  { label: 'Sí', value: 1 },
  { label: 'No', value: 2 },
];

class Preu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preuniversity: null,
    };
    this.handlePreuChange = this.handlePreuChange.bind(this);
  }

  handlePreuChange(res) {
    console.log(res);
    this.setState({ preuniversity: res });
    this.props.logChange(res);
  }

  render() {
    return (
      <div className="slide">
        <div className="slide-header">
          ¿Asistes actualmente a un preuniversitario?
        </div>
        <div className="slide-body">
          <SelectInput
            title="Preuniversitario"
            items={items}
            value={this.state.preuniversity}
            handleChange={res => this.handlePreuChange(res)}
          />
        </div>
      </div>
    );
  }
}

export default Preu;