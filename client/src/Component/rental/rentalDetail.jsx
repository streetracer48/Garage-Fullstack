import React, { Component } from 'react'
import {connect} from 'react-redux'
import * as actions from '../../actions'

class RentalDetail extends Component { 
    // componentDidMount() {
    //     const rentalId = this.props.match.params.id;
    //     this.props.dispatch(actions.fetchRentalById(rentalId)) 
    //  }

    render() {
        // const rental = this.props.rental;
        // console.log('rental data collects',this.props.rental)
    return (
        <div className='container'>
     {/* I am a detail {rental && rental.title} */}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
   rental:state.rental.data
     }

 }

export default connect(mapStateToProps)(RentalDetail);