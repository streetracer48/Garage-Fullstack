import React, {Component} from 'react'
import Modal from 'react-responsive-modal';
import * as moment from 'moment';

class rentalBookingList extends Component {

    state = {
     open:false
    }

    modalOpen = () => {
         this.setState({
              open:true
         })
    }

    modalClose = () => {
         this.setState({
             open:false
         })
    }

    renderBookings = (bookings) => {
        return bookings.map((booking, index) => {
            return (
              <React.Fragment>
                <p><span>Date:</span> {moment(booking.startAt).format('MMM Do Y')} - {moment(booking.endAt).format('MMM Do Y') }</p>
                <p><span>Guests:</span> {booking.guests}</p>
                <p><span>Total Price:</span> {booking.totalPrice} $</p>
                {index + 1 !== bookings.length && <hr></hr>}
              </React.Fragment>
              )
          });

    }

    render () {
        const { open } = this.state;
        const {bookings} = this.props;
         return (
            <React.Fragment>
            <button type="button" onClick={this.modalOpen} className="btn btn-bwm">BookingsLists</button>
            <Modal open={open} onClose={this.modalClose} little classNames={{ modal: 'rental-booking-modal' }}>
               <h4 className="modal-title title">Made Bookings</h4>
               <div className="modal-body bookings-inner-container">
                  {this.renderBookings(bookings)}
              </div>
              <div className="modal-footer">
                <button type="button" onClick={this.modalClose} className="btn btn-bwm">Cancel</button>
              </div>
            </Modal>
          </React.Fragment>

         )
    }

}

export default rentalBookingList