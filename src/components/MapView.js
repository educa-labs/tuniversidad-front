import React from 'react';
import { GoogleMap, Marker, withGoogleMap } from 'react-google-maps';


const SimpleMapExampleGoogleMap = withGoogleMap(props => {
  console.log(props);
  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 33, lng: 33 }}
    />
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

