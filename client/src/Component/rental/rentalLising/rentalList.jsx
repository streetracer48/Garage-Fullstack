import React, { Component } from 'react'
import {connect} from 'react-redux'
import RentalCard from './rentalCard'

import * as actions from '../../../actions'

 class RentalList extends Component {
 
 
  renderRentals = () => {
    return this.props.rentals.map((rental) => {
       return ( 
           <RentalCard rental={rental}/>
       )

    })
}

  componentDidMount () {
    this.props.dispatch(actions.fetchRentals())
   }
 
 
    render() {
    return (
        <div className='container'>
        <section id='rentalListing'>
          <h1 class='page-title'>Your Home All Around the World</h1>
          <div class='row'>
           {this.renderRentals()}
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    rentals:state.rentals.data
   }

 }


export default connect(mapStateToProps)(RentalList)