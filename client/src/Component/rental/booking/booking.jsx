import React,{Component} from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import {getRangeOfDates} from '../../../helpers/index'
import * as moment from 'moment'

class Booking extends Component {

  
    bookedOutDates=[];
    dateRef = React.createRef();

    state = {
      proposedBooking:{
        startAt: '',
        endAt: '',
        guests: '',
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


     GuestNumber = (event) => {
      const guests = parseInt(event.target.value, 10);
      this.setState({
        proposedBooking: {
          ...this.state.proposedBooking,
          guests
        }

      })

      
  }

  reserve = () => {
    console.log(this.state.proposedBooking)
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
           onChange={(event) => this.GuestNumber(event)}
            aria-describedby='emailHelp' placeholder=''></input>
        </div>
        <button  onClick={this.reserve} className='btn btn-bwm btn-confirm btn-block'>Reserve place now</button>
        <hr></hr>
        <p className='booking-note-title'>People are interested into this house</p>
        <p className='booking-note-text'>
          More than 500 people checked this rental in last month.
        </p>
      </div>
    )
  }
}

export default Booking