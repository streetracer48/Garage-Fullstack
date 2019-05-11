import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import BookingCard from './bookingCard'
import {PaymentCard} from './PaymentCard'
import ReviewModal from '../../../review/ReviewModal'
import * as actions from '../../../../actions/index'
import {isExpired} from "../../../../helpers/"
 class BookingManage  extends Component {

  state = {
    pendingPayments: []
  }

componentDidMount(){
     this.props.dispatch(actions.Userbookings());
     this.getPendingPayments()
}

getPendingPayments = () => {
  actions.getPendingPayments()
    .then(pendingPayments => this.setState({pendingPayments}))
    .catch(err => console.error(err));
}

acceptPayment = (payment) => {
  actions.acceptPayment(payment)
    .then(status => {
      this.getPendingPayments();
    })
    .catch(err => console.error(err))
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


renderPayments(payments) {
  return payments.map((payment, index) => <PaymentCard booking={payment.booking}
                                                       payment={payment}
                                                       paymentBtns={this.renderPaymentButtons}
                                                      key={index} />);
}

renderPaymentButtons = (payment) => {
  return (
    <div>
      <button onClick={() => this.acceptPayment(payment)} className="btn btn-success">Accept</button>{' '}
      <button onClick={() => this.declinePayment(payment)} className="btn btn-danger">Decline</button>
    </div>
  )
}

    render() {
         const {userbookings, isFetching} = this.props;
         const {pendingPayments} = this.state;

         if(!userbookings.isLoading)
         {
       
        return (

          <React.Fragment>
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
      <section id="pendingBookings">
          <h1 className="page-title">Pending Bookings</h1>
          <div className="row">
          { this.renderPayments(pendingPayments) }
          </div>
          { !isFetching && pendingPayments.length === 0 &&
            <div className="alert alert-warning">
              You have no pending bookings currently...
            </div>
          }
        </section>
      </React.Fragment>
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