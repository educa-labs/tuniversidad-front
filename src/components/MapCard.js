import React from 'react';
import Pin from 'material-ui/svg-icons/communication/location-on';
import MapView from './MapView';

function MapCard({ mobile, campus }) {
  return (
    <div className={`general-card ${mobile ? '' : 'general-card_desk'}`}>
      <div className="general-card__header">
        <div className="general-card__title">{campus.title}</div>
        <Pin color="#424242" />
      </div>
      <div className="map-card-body">
        <MapView
          lat={campus.lat}
          lng={campus.long}
        />
      </div>
    </div>
  );
}

export default MapCard;
