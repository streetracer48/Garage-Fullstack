const moment = require('moment');
const Booking = require('../models/booking');
const Rental = require('../models/rental')
const User = require('../models/user')
const Payment = require('../models/payment');
const {normalizeErrors} = require('../helper/mongooseError')

const config = require('../config/dev');
const stripe = require('stripe')(config.STRIPE_SK);


const CUSTOMER_SHARE = 0.8;

exports.createBooking = function(req, res) {
  const { startAt, endAt, totalPrice, guests, days, rental, paymentToken } = req.body;
  const user = res.locals.user;

  const booking = new Booking({ startAt, endAt, totalPrice, guests, days});

  Rental.findById(rental._id)
        .populate('bookings')
        .populate('user')
        .exec(async function(err, foundRental) {

    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    if (foundRental.user.id === user.id) {
      return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'Cannot create booking on your Rental!'}]});
    }

    if (isValidBooking(booking, foundRental)) {
      booking.user = user;
      booking.rental = foundRental;
      foundRental.bookings.push(booking);
      const { payment, err } = await createPayment(booking, foundRental.user, paymentToken);

      if (payment) {

        booking.payment = payment;
        booking.save(function(err) {
          if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
          }

          foundRental.save()
          User.update({_id: user.id}, {$push: {bookings: booking}}, function(){});

          return res.json({startAt: booking.startAt, endAt: booking.endAt});
        });
      } else {

        return res.status(422).send({errors: [{title: 'Payment Error', detail: err}]});
      }
    } else {

       return res.status(422).send({errors: [{title: 'Invalid Booking!', detail: 'Choosen dates are already taken!'}]});
    }
  })
}

// exports.createBooking = function (req, res) {
//      const {startAt, endAt,totalPrice, guests,days,rental,paymentToken} = req.body;
//      console.log(endAt)
//     const user = res.locals.user;
// //     console.log(user);
//     // res.json({'createBooking':'ok'});
//      const booking = new Booking({startAt, endAt,totalPrice, guests, days });
// //   console.log(rental);
//      Rental.findById(rental._id)
//              .populate('bookings')
//              .populate('user')
//          .exec(function(err, foundRental) {
//             console.log(foundRental.user);
     
//                if(err) {
//                      return res.status(422).send({errors:normalizeErrors(err.errors)});
//                  }
   

//                  if (foundRental.user.id === user.id) {
//                     return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'Cannot create booking on your Rental!'}]});
//                   }

//                   if(isValidBooking(booking, foundRental))
//                   {
//                       booking.user = user;
//                       booking.rental=foundRental;
//                       foundRental.bookings.push(booking);

//                       const { payment, err } = await createPayment(booking, foundRental.user, paymentToken);

//                       if (payment) {

//                         booking.payment = payment;
//                         booking.save(function(err) {
//                           if (err) {
//                             return res.status(422).send({errors: normalizeErrors(err.errors)});
//                           }
                
//                           foundRental.save()
//                           User.update({_id: user.id}, {$push: {bookings: booking}}, function(){});
                
//                           return res.json({startAt: booking.startAt, endAt: booking.endAt});
//                         });
//                       } else {
                
//                         return res.status(422).send({errors: [{title: 'Payment Error', detail: err}]});
//                       }

//                       booking.save((err) => {
//                           if(err) {
//                             return res.status(422).send({errors:normalizeErrors(err.errors)});
//                           }
//                           foundRental.save();
//                           User.update({_id: user.id}, {$push: {bookings: booking}},(err)=>{
//                               if(err)
//                               {
//                                 return res.status(422).send({errors:normalizeErrors(err.errors)});
//                               }
//                           });
//                           })
                      
//                      return res.status(200).send({startAt: booking.startAt, endAt: booking.endAt})

//                   }
//                   else {
//                     return res.status(422).send({errors: [{title: 'Invalid Booking!', detail: 'Choosen dates are already taken!'}]});
//                    }

//                   return res.json({booking,foundRental})
                 
//              });

// } 

exports.getUserBookings = function(req, res, next) {
  const user = res.locals.user;

  Booking.where({user: user}).populate('rental').exec(function(err, foundBookings){
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors) });
    }

    res.json(foundBookings);
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
  
        return ((proposedStart < proposedEnd && actualStart < proposedStart && actualEnd < proposedStart) || (proposedStart < proposedEnd && proposedEnd < actualEnd && proposedEnd < actualStart));
      });
    }
  
    return isValid;
  }


  async function createPayment(booking, toUser, token) {
    const { user } = booking;
    const tokenId = token.id || token;
  
    const customer = await stripe.customers.create({
      source: tokenId,
      email: user.email
    });
  
    if (customer) {
      User.update({_id: user.id}, { $set: {stripeCustomerId: customer.id}}, () => {});
  
      const payment = new Payment({
        fromUser: user,
        toUser,
        fromStripeCustomerId: customer.id,
        booking,
        tokenId: token.id,
        amount: booking.totalPrice * 100 * CUSTOMER_SHARE
      });
  
      try {
        const savedPayment = await payment.save();
        return {payment: savedPayment};
  
      } catch(err) {
        return {err: err.message};
      }
  
    } else {
      return {err: 'Cannot process Payment!'}
    }
  }
