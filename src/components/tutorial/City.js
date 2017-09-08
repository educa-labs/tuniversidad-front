import React from 'react';
import PropTypes from 'prop-types';
import SelectInput from '../inputs/SelectInput';

const City = ({
  handleRegionChange,
  handleCityChange,
  cities,
  regions,
  region,
  city,
}) => (
  <div className="slide">
    <div className="slide-header">¿De dónde eres?</div>
    <div className="slide-body">
      <div className="slide-col">
        <SelectInput
          title="Región"
          items={regions}
          value={region}
          fullWidth
          handleChange={region => handleRegionChange(region)}
          maxHeight={250}
        />
        <SelectInput
          title="Comuna"
          items={cities}
          value={city}
          handleChange={id => handleCityChange(id)}
          fullWidth
          maxHeight={250}
        />
      </div>
    </div>
  </div>
);

City.propTypes = {
  handleCityChange: PropTypes.func.isRequired,
  handleRegionChange: PropTypes.func.isRequired,
  cities: PropTypes.array.isRequired,
  regions: PropTypes.array.isRequired,
  region: PropTypes.number,
  city: PropTypes.number,
};

export default City;
