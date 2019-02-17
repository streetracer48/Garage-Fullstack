const Booking = require('../models/booking');
const Rental = require('../models/rental')
const {normalizeErrors} = require('../helper/mongooseError')

exports.createBooking = function (req, res) {
     const {startAt, endAt,totalPrice, guests,days,rental} = req.body;
     console.log(endAt)
    const user = res.locals.user;
    // console.log(user);
    // res.json({'createBooking':'ok'});
     const booking = new Booking({startAt, endAt,totalPrice, guests, days });
//   console.log(rental);
     Rental.findById(rental._id)
             .populate('bookings')
             .populate('user')
         .exec(function(err, foundRental) {
         console.log(foundRental.user)
               if(err) {
                     return res.status(422).send({errors:normalizeErrors(err.errors)});
                 }


                 if ('5c6578a50a4df13788c76847'=== user.id) {
                 return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'Cannot create booking on your Rental!'}]});
               }
                  return res.json({booking,foundRental});
             })
} 