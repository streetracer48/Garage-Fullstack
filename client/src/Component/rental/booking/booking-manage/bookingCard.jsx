import React from 'react';
import { Link } from 'react-router-dom'
import * as moment from 'moment';
// import { toUpperCase } from 'helpers';

const  BookingCard = (props) => {
  const { booking, review, hasReview, isExpired } = props;
console.log('Isexpired',isExpired)

  return (
    <div className="col-md-4">
      <div className="card text-center">
        <div className="card-header">
          {booking.rental.category}
        </div>
        <div className="card-block">
          <h4 className="card-title">{booking.rental.title} - {booking.rental.city}</h4>
          <p className="card-text booking-desc">{booking.rental.description}</p>
          <p className="card-text booking-days">{moment(booking.startAt).format('MMM Do Y')} - {moment(booking.endAt).format('MMM Do Y')} | {booking.days} days</p>
          <p className="card-text booking-price"><span>Price: </span> <span className="booking-price-value">{booking.totalPrice} $</span></p>
          <Link className="btn btn-bwm" to={`/rentals/${booking.rental._id}`}>Go to Rental</Link>
          { review && !hasReview && isExpired && review()}
        </div>
        <div className="card-footer text-muted">
          Created {moment(booking.createdAt).format('MMM Do Y')}
        </div>
      </div>
    </div>
  )
}

export default BookingCard