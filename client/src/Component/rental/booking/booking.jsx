import React,{Component} from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import {getRangeOfDates} from '../../../helpers/index'
import BookingModal from './bookingModal'

import * as action from '../../../actions/index'
import { ToastContainer, toast } from 'react-toastify';
import * as moment from 'moment'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Payment from '../../payment/Payment'

class Booking extends Component {

  
    bookedOutDates=[];
    dateRef = React.createRef();

    state = {
      proposedBooking:{
        startAt: '',
        endAt: '',
        guests: '',
        paymentToken:''
      },
      modal:{
         open:false
      },
      errors:[]
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
    this.resetData();
  }


  setPaymentToken = (paymentToken) => {
    console.log(paymentToken)
    const {proposedBooking} = this.state;
    proposedBooking.paymentToken = paymentToken;

    this.setState({proposedBooking});
  }


  addNewBookedOutDates = (booking) => {
    const dateRange = getRangeOfDates(booking.startAt, booking.endAt,'Y/MM/DD');
    this.bookedOutDates.push(...dateRange);
  }

  resetData = () => {
    this.dateRef.current.value='';
    this.setState({
      proposedBooking:{guests:''}
    });
  }



  bookingRental = () => {

    action.createBooking(this.state.proposedBooking).then(
      (booking) => {
        this.addNewBookedOutDates(booking);
        this.cancelConfirmation();
        this.resetData();
        toast.success('Booking has been succesfuly created! Enjoy.');
      },

      (errors) => {
        this.setState({errors})
       }

    )


   }

  render() {
    const {rental, auth: { isAuth }}= this.props
    const {startAt, endAt, guests, paymentToken} = this.state.proposedBooking
    return (
      <div className='booking'>
      <ToastContainer/>
        <h3 className='booking-price'>$ {rental.dailyRate} <span className='booking-per-night'>per night</span></h3>
        <hr></hr>
        { !isAuth &&
          <Link className='btn btn-bwm btn-confirm btn-block' to={{pathname: '/login'}}>
            Login to book place.
          </Link>
        }
        { isAuth &&
          <React.Fragment>
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
          value={guests}
          type='number'
           className='form-control' 
           id='guests'
           onChange={(event) => this.SelectGuestNumber(event)}
            aria-describedby='emailHelp' placeholder=''></input>
        </div>
        <button disabled={!startAt || !endAt || !guests} onClick={this.confirmProposedData} className='btn btn-bwm btn-confirm btn-block'>Reserve place now</button>
        </React.Fragment>
         }
        <hr></hr>
        <p className='booking-note-title'>People are interested into this house</p>
        <p className='booking-note-text'>
          More than 500 people checked this rental in last month.
        </p>
        <BookingModal
         open={this.state.modal.open}
         booking={this.state.proposedBooking}
         errors={this.state.errors}
         closeModal={this.cancelConfirmation}
         perNightPrice={rental.dailyRate}
         bookingRental={this.bookingRental}
         paymentToken={paymentToken}

         acceptPayment={() => <Payment setPaymentToken={this.setPaymentToken}/>}
         />
      </div>
     
    )
  }
}

const mapStateToProps = (state) => {
  return {
     auth:state.auth
  }
}

export default connect(mapStateToProps) (Booking)