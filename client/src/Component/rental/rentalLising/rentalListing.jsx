import React, { Component } from 'react'
import {connect} from 'react-redux'
import RentalList from './rentalList'

import * as actions from '../../../actions'

 class RentalListing extends Component {
 
  componentDidMount () {
    this.props.dispatch(actions.fetchRentals())
   }
 
    render() {
         const {successRentalCreated}  = this.props.location.state || false
    return (
        
        <section id='rentalListing'>
         {
               successRentalCreated &&
                  <div className='alert alert-success'>
                    <p> Congratulations, You have been succesfuly Created Rental, . </p>
                  </div>
              }
          <h1 class='page-title'>Your Home All Around the World</h1>
           <RentalList rentals={this.props.rentals}/>
        </section>

    )
  }
}

const mapStateToProps = (state) => {

  return {
    rentals:state.rentals.data
   }

 }


export default connect(mapStateToProps)(RentalListing)