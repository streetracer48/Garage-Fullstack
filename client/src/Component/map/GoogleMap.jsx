import React from 'react'

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
  } from "react-google-maps";

   const mapComponent = () => {

    return (
        <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
    >
      <Marker
        position={{ lat: -34.397, lng: 150.644 }}
      />
    </GoogleMap>
     )

   }
  
 export const MapWithAMarker = withScriptjs(withGoogleMap(mapComponent));
  
 