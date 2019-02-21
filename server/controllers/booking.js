const moment = require('moment');
const Booking = require('../models/booking');
const Rental = require('../models/rental')
const {normalizeErrors} = require('../helper/mongooseError')

exports.createBooking = function (req, res) {
     const {startAt, endAt,totalPrice, guests,days,rental} = req.body;
     console.log(endAt)
    const user = res.locals.user;
//     console.log(user);
    // res.json({'createBooking':'ok'});
     const booking = new Booking({startAt, endAt,totalPrice, guests, days });
//   console.log(rental);
     Rental.findById(rental._id)
             .populate('bookings')
             .populate('user')
         .exec(function(err, foundRental) {
            console.log(foundRental.user);
     
               if(err) {
                     return res.status(422).send({errors:normalizeErrors(err.errors)});
                 }
   

                 if (foundRental.user.id === user.id) {
                    return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'Cannot create booking on your Rental!'}]});
                  }

                  if(isValidBooking(booking, foundRental))
                  {
                      booking.user = user;
                      booking.rental=foundRental;
                      foundRental.bookings.push(booking);
                      foundRental.save();
                      booking.save();
                     return res.status(200).send({'valid':true})

                  }
                  else {
                    return res.status(422).send({errors: [{title: 'Invalid Booking!', detail: 'Choosen dates are already taken!'}]});
                   }

                  return res.json({booking,foundRental})
                 
             });

} 

function isValidBooking(proposedBooking, rental) {
    let isValid = true;
  
    if (rental.bookings && rental.bookings.length > 0) {
  
      isValid = rental.bookings.every(function(booking) {
        const proposedStart = moment(proposedBooking.startAt);
        const proposedEnd = moment(proposedBooking.endAt);
  
        const actualStart = moment(booking.startAt);
        const actualEnd = moment(booking.endAt);
  
        return ((actualStart < proposedStart && actualEnd < proposedStart) || (proposedEnd < actualEnd && proposedEnd < actualStart));
      });
    }
  
    return isValid;
  }

