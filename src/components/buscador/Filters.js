import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import is from 'is_js';
import SelectInput from '../inputs/SelectInput';
import Loading from '../Loading';
import { getCities } from '../../helpers/api';
import { capitalize } from '../../helpers/strings';

import { changeFilterValue } from '../../actions/filter';
import { CAREER, UNIVERSITY } from '../../constants/strings';

const all = { value: -1, label: 'Todas' };
const allM = { value: -1, label: 'Todos' };

const getOptions = (items) => {
  const result = items.map(item => ({
    value: item.id, label: capitalize(item.title),
  }));
  result.unshift(all);
  return result;
};

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
    };
  }

  onRegionChange(id, token) {
    getCities(id, token)
    .then(res => this.setState({ cities: res.body }))
    .catch(() => this.setState({ cities: [] }));
  }

  render() {
    if (is.null(this.props.regions)) return <Loading />;

    const { values, token, active } = this.props;

    const regionInput = (
      <SelectInput
        title="Region"
        items={getOptions(this.props.regions)}
        value={values.region}
        handleChange={(region) => {
          this.props.changeFilterValue('region_id', region);
          this.onRegionChange(region, token);
        }}
        fullWidth
        maxHeight={180}
      />
    );

    const cityInput = (
      <SelectInput
        title={this.state.region === 13 ? 'Comuna' : 'Ciudad'}
        items={getOptions(this.state.cities)}
        value={values.cities}
        multiple
        handleChange={id => this.props.changeFilterValue('cities', id)}
        fullWidth
      />
    );

    if (active === CAREER) {
      return (
        <div>
          {regionInput}
          {cityInput}
        </div>
      );
    }
    return (
      <div>
        {regionInput}
      </div>
    );
  }
}

Filters.propTypes = {
  active: PropTypes.string.isRequired,
  changeFilterValue: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  regions: PropTypes.array,
  values: PropTypes.shape({
    region: PropTypes.number,
    cities: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
};

const stateToProps = state => ({
  regions: state.fetch.regions,
  values: {
    region: state.filter.region_id,
    cities: state.filter.cities ,
  },
});

export default connect(stateToProps, {
  changeFilterValue,
})(Filters);
