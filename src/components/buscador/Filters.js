import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import is from 'is_js';
import SelectInput from '../inputs/SelectInput';
import Loading from '../Loading';

import { changeFilterValue } from '../../actions/filter';
import { CAREER, UNIVERSITY } from '../../constants/strings';

function Filters(props) {
  if (is.null(props.regions)) return <Loading />;

  const regions = props.regions.map(reg => ({
    value: reg.id, label: reg.title,
  }));

  const regionInput = (
    <SelectInput
      title="Region"
      items={regions}
      value={props.values.region}
      handleChange={(region) => {
        console.log(region);
        props.changeFilterValue('region_id', region);
        //this.handleRegionChange(region);
      }}
      fullWidth
      maxHeight={180}
    />
  );
  if (props.active === CAREER) {
    return (
      <div>
        {regionInput}
      </div>
    );
  }
  return (
    <div>
      {regionInput}
    </div>
  );
}

Filters.propTypes = {
  active: PropTypes.string.isRequired,
  changeFilterValue: PropTypes.func.isRequired,
  regions: PropTypes.array,
  values: PropTypes.shape({
    region: PropTypes.number,
  }).isRequired,
};

const stateToProps = state => ({
  regions: state.fetch.regions,
  values: {
    region: state.filter.region_id,
  },
});

export default connect(stateToProps, {
  changeFilterValue,
})(Filters);
