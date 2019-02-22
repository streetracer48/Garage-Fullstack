import React, { Component } from 'react'
import {connect} from 'react-redux'
import {RentalDetailInfo} from './rentalDetailInfo'
import RentalMap from '../rentalMap/rentalMap'
import Booking from '../booking/booking'

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
    <RentalMap location={`${rental.city}, ${rental.street}`}/>
      </div>
    </div>
  </div>

  <div className='details-section'>
    <div className='row'>
      <div className='col-md-8'>
       <RentalDetailInfo rental={rental}/>
      </div>
      <div className='col-md-4'>
      <Booking rental={rental}/> 
      </div>
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