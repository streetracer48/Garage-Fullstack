import React,{Component} from 'react'

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
  } from "react-google-maps";
import { resolve } from 'url';

   const mapComponent = ({coordinates}) => {

    return (
        <GoogleMap
      defaultZoom={8}
      defaultCenter={coordinates}
      center={coordinates}
    >
      <Marker
        position={coordinates}
      />
    </GoogleMap>
     )

   }

   const WithGeocode = (WrapperComponent) => {

    return class  extends Component {

        state = {
            coordinates:{
                lat:0,
                lng:0
            },

        }

        componentDidMount() {
            this.geoCodeLocation()
        }

        geoCodeLocation = () => {
            const location = this.props.location;
            const geocoder = new window.google.maps.Geocoder();

            geocoder.geocode({address:location}, (result, status) => {
                if(status === 'OK'){
                    const geometry = result[0].geometry.location;
                    const coordinates = {lat:geometry.lat(), lng:geometry.lng()}
                    this.setState({
                        coordinates
                    });
                }
            });

        }
        
     render () {
        console.log(this.props.location)
             return(
                 <WrapperComponent {...this.state}/>

             )
        }
  
     }

   }


  
 export const MapWithGeocode = withScriptjs(withGoogleMap(WithGeocode(mapComponent)));
  
 