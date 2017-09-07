import React from 'react';
import PropTypes from 'prop-types';
import MapView from '../MapView';

function CareerCampus({ campus, mobile }) {
  return (
    <div className="univ-card">
      <div className="univ-card-header">Campus {campus.title}</div>
      <div className="general-card">
        <div className="map-card-body">
          <MapView
            lat={campus.lat}
            lng={campus.long}
          />
        </div>
      </div>
    </div>
  );
}

CareerCampus.defaultProps = {
  mobile: false,
};

CareerCampus.propTypes = {
  mobile: PropTypes.bool,
  campus: PropTypes.object.isRequired,
};

export default CareerCampus;
