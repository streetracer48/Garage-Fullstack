import React from 'react'
import Modal from 'react-responsive-modal'
import {ResError} from '../../../utils/ResErrors/ResErrors'

const BookingModal = ({closeModal, open,booking,perNightPrice, bookingRental,acceptPayment, errors}) => { 

  console.log(acceptPayment)
 
    return(
        <Modal open={open} closeModal={closeModal} little classNames={{ modal: 'booking-modal' }}>
   <h4 className='modal-title title'>Confirm Booking </h4>
   <p className='dates'>{booking.startAt}/{booking.endAt}</p>
   <div className='modal-body'>
    <em>{booking.days}</em> nights /
    <em>{perNightPrice}$</em> per Night
    <p>Guests: <em>{booking.guests}</em></p>
    <p>TotalPrice: <em>{booking.totalPrice}$ </em></p>
    {acceptPayment && acceptPayment()}
    <p>Do you confirm your booking for selected days?</p>
  </div>
  <ResError errors={errors}/>
  <div className='modal-footer'>
    <button type='button' onClick={bookingRental} className='btn btn-bwm'>Confirm</button>
    <button type='button' onClick={closeModal} className='btn btn-bwm'>Cancel</button>
  </div>
</Modal>

    )

     
}

export default BookingModal