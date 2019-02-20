import React,{Component} from 'react'

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

   const WithGeocode = (WrapperComponent) => {

    return class  extends Component {
        
     render () {
        console.log(this.props.location)
             return(
                 <WrapperComponent/>

             )
        }
  
     }

   }


  
 export const MapWithGeocode = withScriptjs(withGoogleMap(WithGeocode(mapComponent)));
  
 