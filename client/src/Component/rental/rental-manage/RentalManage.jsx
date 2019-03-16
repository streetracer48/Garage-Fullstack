import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { connect} from 'react-redux'
import * as actions from '../../../actions/index'
import RentalManageCard from './rentalManageCard.jsx'

 class RentalManager  extends Component {

    componentDidMount() {
         this.props.dispatch(actions.UserRental())
    }

    renderUserRentalCard =(userRental) => {

        // return null;
        return userRental.data.map((rental, index)=> 
      <RentalManageCard key={index} rental={rental}/>
        )

}

    render() {
         const {userRental} = this.props;
         
         if(!userRental.isLoading)
         {
        return (
            <section id="userRentals">
        <h1 className="page-title">My Rentals</h1>
        <div className="row">
          {userRental.data && this.renderUserRentalCard(userRental)}
          {userRental.data.length === 0 && <div className="alert alert-warning">
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

const mapStateToProps = (state) =>
{
    return {
        userRental:state.userRental
         
    }

}


export default connect(mapStateToProps) (RentalManager);