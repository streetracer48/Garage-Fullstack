import React from 'react';
import { MapWithGeocode} from 'components/map/GoogleMap';

class RentalMap extends React.Component {

  render() {
    const { location } = this.props;

    return (
      <MapWithGeocode
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDW9tFSqG2mA0ym2NluRBVGZ6tPr8xbwRM&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `405px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        location={location}
      />
    )
  }
}



export default RentalMap