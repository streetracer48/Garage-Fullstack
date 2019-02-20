import React, { Component } from 'react'
import {connect} from 'react-redux'
import {RentalDetailInfo} from './rentalDetailInfo'
import {MapWithAMarker} from '../../map/GoogleMap'
import * as actions from '../../../actions'

class RentalDetail extends Component { 
    componentDidMount() {
      const rentalId = this.props.match.params.id;
       this.props.dispatch(actions.fetchRentalById(rentalId)) 
     }
    render() {

        const rental = this.props.rental;
        const isloading = this.props.isloading;
        // console.log('rental data collects',this.props.rental)

        if(!isloading){

        
    return (
        <div className='container'>
     <section id='rentalDetails'>
  <div className='upper-section'>
    <div className='row'>
      <div className='col-md-6'>
        <img src={rental.image} alt=''></img>
      </div>
      <div className='col-md-6'>
      <MapWithAMarker
    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCzZODMGtUsSH4MH9rnjFQEuoc85BU6Ddw&v=3.exp&libraries=geometry,drawing,places"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `350px` }} />}
    mapElement={<div style={{ height: `100%` }} />}
  />
      </div>
    </div>
  </div>

  <div className='details-section'>
    <div className='row'>
      <div className='col-md-8'>
       <RentalDetailInfo rental={rental}/>
      </div>
      <div className='col-md-4'> BOOKING</div>
    </div>
  </div>
</section>

      </div>
    )
        }
        else {
          return <h1>loading ....</h1> 
        }
  }
}

const mapStateToProps = (state) => {
    return {
   rental:state.rental.data,
   isloading:state.rental.isloading
     }

 }

export default connect(mapStateToProps)(RentalDetail);