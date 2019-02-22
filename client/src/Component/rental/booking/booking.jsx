import React,{Component} from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import {getRangeOfDates} from '../../../helpers/index'
import BookingModal from './bookingModal'
import * as moment from 'moment'

class Booking extends Component {

  
    bookedOutDates=[];
    dateRef = React.createRef();

    state = {
      proposedBooking:{
        startAt: '',
        endAt: '',
        guests: '',
      },
      modal:{
         open:false
      }
    }


  
    componentDidMount() {
        this.getBookedOutDate()
    }


    getBookedOutDate = () => {
        const {bookings} = this.props.rental;

        if(bookings && bookings.length>0)
        {

            bookings.map(booking => {
                const bookedDatesRange = getRangeOfDates(booking.startAt, booking.endAt, 'Y/MM/DD');
              
                this.bookedOutDates.push(...bookedDatesRange);
             })
             
        }
   console.log(this.bookedOutDates);
      
     }

     checkInvalidDates = (date) => {
      return  this.bookedOutDates.includes(date.format('Y/MM/DD')) || date.diff(moment(), 'days') < 0;
      }

     handleApply = (event, picker) => {
      const startAt = picker.startDate.format('Y/MM/DD');
      const endAt = picker.endDate.format('Y/MM/DD');
      this.dateRef.current.value = startAt + ' to ' + endAt;

      this.setState({
        
        proposedBooking:{
          ...this.state.proposedBooking,
          startAt,
          endAt
        }
        
      })

      // console.log(this.state.proposedState);

     } 


     SelectGuestNumber = (event) => {
      const guests = parseInt(event.target.value, 10);
      this.setState({
        proposedBooking: {
          ...this.state.proposedBooking,
          guests
        }

      })
  }

  confirmProposedData = () => {
    const {startAt, endAt} = this.state.proposedBooking;
    const days = getRangeOfDates(startAt, endAt,'Y/MM/DD').length - 1;
    const { rental } = this.props;

    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        days,
        totalPrice: days * rental.dailyRate,
        rental
      },
      modal: {
        open: true
      }
    });
  }

  cancelConfirmation = () => {
    this.setState({
      modal: {
        open: false
      }
    })
  }

  render() {
    const {rental}= this.props
    return (
      <div className='booking'>
        <h3 className='booking-price'>$ {rental.dailyRate} <span className='booking-per-night'>per night</span></h3>
        <hr></hr>
        <div className='form-group'>
        <label htmlFor='dates'>Dates</label>
                      <DateRangePicker 
                            onApply={this.handleApply}
                             opens='left'
                             containerStyles={{display: 'block'}}
                             isInvalidDate={this.checkInvalidDates}
                             >
              <input ref={this.dateRef} id='dates' type='text' className='form-control'></input>
            </DateRangePicker>
        </div>
        <div className='form-group'>
          <label htmlFor='guests'>Guests</label>
          <input 
          type='number'
           className='form-control' 
           id='guests'
           onChange={(event) => this.SelectGuestNumber(event)}
            aria-describedby='emailHelp' placeholder=''></input>
        </div>
        <button  onClick={this.confirmProposedData} className='btn btn-bwm btn-confirm btn-block'>Reserve place now</button>
        <hr></hr>
        <p className='booking-note-title'>People are interested into this house</p>
        <p className='booking-note-text'>
          More than 500 people checked this rental in last month.
        </p>
        <BookingModal
         open={this.state.modal.open}
         booking={this.state.proposedBooking}
         closeModal={this.cancelConfirmation}
         perNightPrice={rental.dailyRate}
         />
      </div>
    )
  }
}

export default Booking