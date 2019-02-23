import React,{Component} from 'react'

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Circle,
  } from "react-google-maps";
  import {Cacher} from '../services/cacher'

   const mapComponent = ({coordinates}) => {

    return (
        <GoogleMap
      defaultZoom={15}
      defaultCenter={coordinates}
      center={coordinates}
    >
     <Circle center={coordinates} radius={200} />}
    </GoogleMap>
     )

   }

   const WithGeocode = (WrapperComponent) => {

    return class  extends Component {

         cacher = new Cacher();
        
        state = {
            coordinates:{
                lat:0,
                lng:0
            },

        }

       

        componentDidMount() {
            this.geoCodeLocation()
        }

        geoCodeLocation = (location) => {
            const geocoder = new window.google.maps.Geocoder();

            return new Promise((resolve, reject) => {
              geocoder.geocode({address: location}, (result, status) => {
      
                if (status === 'OK') {
                  const geometry = result[0].geometry.location;
                  const coordinates = { lat: geometry.lat(), lng: geometry.lng()};
      
                  this.cacher.cacheValue(location, coordinates);
      
                  resolve(coordinates);
                } else {
                  reject('ERROR!!!!');
                }
              });
            });
        }




        getGeoCodeLocation = () => {
            const location = this.props.location;
            
            console.log('testing',this.cacher.isValueCached());
            // if location is cached return cached values
            if(this.cacher.isValueCached(location))
            {
                console.log('cacher data true');
                this.setState({coordinates:this.cacher.getCachedValue(location)})

            }
            // else gecode location

            else {
                this.geocodeLocation(location).then(
                    (coordinates) => {
                      this.setState({
                        coordinates
                      })
                    },
                    (error) => {
                     
                    });

            }


            

        }
        
     render () {
        
             return(
                 <WrapperComponent {...this.state}/>

             )
        }
  
     }

   }


  
 export const MapWithGeocode = withScriptjs(withGoogleMap(WithGeocode(mapComponent)));
  
 