import React, { Component } from 'react';
import SelectInput from '../inputs/SelectInput';
import { getCities } from '../../helpers/api';

class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
      cities: [],
      city: null,
    };
    this.handleRegionChange = this.handleRegionChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
  }

  handleRegionChange(id) {
    this.setState({ region: id });
    getCities(id, this.props.token)
      .then(res => this.setState({ cities: res.body }))
      .catch(() => this.setState({ cities: [] }));
  }

  handleCityChange(id) {
    this.setState({ city: id });
    this.props.logChange(id);
  }

  render() {
    if (this.props.regions === null) return <div>Cargando ...</div>;
    const regions = this.props.regions.map((reg) => {
      return { value: reg.id, label: reg.title };
    });
    return (
      <div className={`slide ${this.props.mobile ? 'slide-mobile' : ''}`}>
        <div className="slide-header">
          ¿De dónde eres?
        </div>
        <div className={`col padding-${this.props.mobile ? '2' : '8'}`}>
          <SelectInput
            title="Región"
            items={regions}
            value={this.state.region}
            fullWidth
            handleChange={region => this.handleRegionChange(region)}
            maxHeight={250}
          />
          <SelectInput
            title={this.state.region === 13 ? 'Comuna' : 'Ciudad'}
            items={this.state.cities}
            value={this.state.city}
            handleChange={id => this.handleCityChange(id)}
            fullWidth
            maxHeight={250}
          />
        </div>
      </div>
    );
  }
}

export default City;

