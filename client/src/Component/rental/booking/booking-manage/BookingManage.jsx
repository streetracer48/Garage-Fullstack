import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import BookingCard from './bookingCard'
import ReviewModal from '../../../review/ReviewModal'
import * as actions from '../../../../actions/index'
import {isExpired} from "../../../../helpers/"
 class BookingManage  extends Component {

componentDidMount(){
     this.props.dispatch(actions.Userbookings())
}

renderBooking =(userbookings) => {

    return userbookings.data.map((booking, index)=> 
      <BookingCard 
      key={index} 
      booking={booking}
     hasReview = {!!booking.review}
     isExpired={isExpired}
      review ={() => <ReviewModal  bookingId={booking._id}/> }
      />

)

}

    render() {
         const {userbookings} = this.props;

         if(!userbookings.isLoading)
         {
       
        return (
            <section id="userBookings">
        <h1 className="page-title">My Bookings</h1>
        <div className="row">

         {userbookings.data.length>0 && this.renderBooking(userbookings)}
          {userbookings.data.length === 0 && <div class="alert alert-warning">
            You have no bookings created go to rentals section and book your place today.
            <Link style={{'margin-left': '10px'}} class="btn btn-bwm" to="/rentals">Available Rental</Link>
          </div>}
        </div>
      </section>
        )
              
    }
     else {
      return <p>Loading ...</p>
     }
    }
}

const mapStateToProps = (state) => {
    return {
        userbookings:state.booking

    }
 }


export default connect(mapStateToProps) (BookingManage);