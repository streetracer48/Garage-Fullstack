import React, { Component } from 'react'
import {Link} from 'react-router-dom'
// import { connect} from 'react-redux'
import * as actions from '../../../actions/index'
import RentalManageCard from './rentalManageCard.jsx'
import RentalBookingList from './rentalBookingList.jsx'


 class RentalManager  extends Component {

  state = {
    userRentals: [],
    errors: [],
    isFetching: false
  }
    componentDidMount() {
      this.setState({isFetching: true});

      actions.getUserRentalsPromise().then(
        userRentals => this.setState({userRentals, isFetching: false}),
        errors => this.setState({errors, isFetching: false}))
    }

  

    renderUserRentalCard =(userRentals) => {
        // return null;
        return userRentals.map((rental, index)=> 
      <RentalManageCard  modal={<RentalBookingList bookings={rental.bookings} />}key={index} rental={rental}/>
        )

}


    render() {
         const {userRentals, isFetching} = this.state;
        
         
         if(!isFetching)
         {
        return (
            <section id="userRentals">
        <h1 className="page-title">My Rentals</h1>
        <div className="row">
          {userRentals && this.renderUserRentalCard(userRentals)}
          {userRentals.length === 0 && <div className="alert alert-warning">
            You dont have any rentals currenty created. If you want advertised your property
            please follow this link.
            <Link style={{'marginLeft': '10px'}} className="btn btn-bwm" to="/rentals/create">Register Rental</Link>
          </div>}
        </div>
      </section>
        )
    }
         else {
             return <p>Loading...</p>
         }
    }
}

// const mapStateToProps = (state) =>
// {
//     return {
//         userRental:state.userRental
         
//     }

// }


export default RentalManager;