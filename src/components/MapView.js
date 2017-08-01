import React from 'react';
import { GoogleMap, Marker, withGoogleMap } from 'react-google-maps';


const SimpleMapExampleGoogleMap = withGoogleMap(props => {
  const marker = {
    position: {
      lat: parseFloat(props.lat),
      lng: parseFloat(props.lng),
    },
  };
  return (
    <GoogleMap
      defaultZoom={14}
      defaultCenter={{ lat: parseFloat(props.lat), lng: parseFloat(props.lng) }}
      defaultOptions={{
        scrollwheel: false,
      }}
    >
      <Marker
        {...marker}
      />
    </GoogleMap >
  );
});

function MapView(props) {
  return (
    <SimpleMapExampleGoogleMap
      {...props}
      containerElement={
        <div style={{ height: '100%' }} />
      }
      mapElement={
        <div style={{ height: '100%' }} />
      }
    />
  );
}

export default MapView;

