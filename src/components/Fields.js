import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import is from 'is_js';
import capitalize from '../helpers/capitalize';
import SelectInput from './inputs/SelectInput';
import RangeInput from './inputs/RangeInput';
import Loading from '../components/Loading';
import { getCities } from '../helpers/api';
import { numeral } from '../helpers/numeral';
import '../styles/Fields.css';

const yesNo = [
  { value: 1, label: 'No' },
  { value: 2, label: 'Sí' },
  { value: -1, label: 'Todas' },
];

const all = { value: -1, label: 'Todas' };
const allM = { value: -1, label: 'Todos' };


class Fields extends Component {
  componentWillMount() {
    this.setState({
      cities: [],
    });
    this.handleRegionChange = this.handleRegionChange.bind(this);
  }

  handleRegionChange(id) {
    getCities(id, this.props.token)
      .then(res => this.setState({ cities: res.body }))
      .catch(() => this.setState({ cities: [] }));
  }

  render() {
    const { props } = this;
    if (!is.all.existy(props.fields.regions, props.fields.types, props.fields.schedules, props.fields.areas)) {
      return <Loading />;
    }
    const regions = props.fields.regions.map((reg) => {
      return { value: reg.id, label: reg.title };
    });
    regions.unshift(all);
    const cities = this.state.cities.map((city) => {
      return { label: city.title, value: city.id };
    });
    cities.unshift(all);
    const types = props.fields.types.map((type) => {
      return { value: type.id, label: capitalize(type.title) };
    });
    types.unshift(all);
    const areas = props.fields.areas.map((area) => {
      return { value: area.id, label: capitalize(area.title) };
    });
    areas.unshift(all);
    const schedules = props.fields.schedules.map((sch) => {
      return { value: sch, label: capitalize(sch) };
    });
    schedules.unshift(allM);
    if (props.type === 0) {
      return (
        <div className="filters__body">
          <SelectInput
            title="Region"
            items={regions}
            value={props.values.region}
            handleChange={(region) => {
              props.changeFilterValue('region_id', region);
              this.handleRegionChange(region);
            }}
            fullWidth
            maxHeight={180}
            style={{ transform: 'scale(0.9)' }}
          />
          <SelectInput
            title="Ciudad"
            items={cities}
            value={props.values.cities}
            handleChange={id => props.changeFilterValue('cities', id)}
            fullWidth
            style={{ transform: 'scale(0.9)' }}
          />
          <SelectInput
            title="Tipo de Universidad"
            items={types}
            value={props.values.university_type}
            handleChange={type => props.changeFilterValue('university_type', type)}
            fullWidth
            style={{ transform: 'scale(0.9)' }}
          />
          <SelectInput
            title="Gratuidad"
            items={yesNo}
            value={props.values.freeness}
            handleChange={freeness => props.changeFilterValue('freeness', freeness)}
            fullWidth
            style={{ transform: 'scale(0.9)' }}
          />
        </div>
      );
    }

    return (
      <div className="filters__body">
        <SelectInput
          title="Region"
          items={regions}
          value={props.values.region}
          fullWidth
          handleChange={(region) => {
            props.changeFilterValue('region_id', region);
            this.handleRegionChange(region);
          }}
          maxHeight={150}
        />
        <SelectInput
          title="Ciudad"
          items={cities}
          multiple
          value={props.values.cities}
          handleChange={city => props.changeFilterValue('cities', city)}
          fullWidth
        />
        <SelectInput
          title="Area"
          items={areas}
          value={props.values.area}
          handleChange={area => props.changeFilterValue('area', area)}
          fullWidth
        />
        <SelectInput
          title="Horario"
          items={schedules}
          value={props.values.schedule}
          handleChange={schedule => props.changeFilterValue('schedule', schedule)}
          fullWidth
          style={{ transform: 'scaleY(0.9)' }}
        />
        <br />
        <RangeInput
          title="Duración (semestres)"
          minValue={1}
          maxValue={16}
          onChange={duration => props.changeFilterValue('duration', duration)}
          value={props.values.duration}
        />
        <RangeInput
          title="Arancel"
          minValue={0}
          maxValue={7000000}
          step={100000}
          onChange={price => props.changeFilterValue('price', price)}
          formatLabel={value => numeral(value)}
          value={props.values.price}
        />
        <RangeInput
          title="Puntaje de corte"
          minValue={450}
          maxValue={850}
          step={10}
          onChange={cut => props.changeFilterValue('cut', cut)}
          value={props.values.cut}
        />
      </div>
    );
  }
}

Fields.propTypes = {
  values: PropTypes.object,
  changeFilterValue: PropTypes.func.isRequired,
  type: PropTypes.number.isRequired,
  fields: PropTypes.object,
  token: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    token: state.user.currentUser.auth_token,
  };
}


export default connect(mapStateToProps)(Fields);
