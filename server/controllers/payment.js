const Payment = require('../models/payment');
const Booking = require('../models/booking');

const Rental = require('../models/rental');
const User = require('../models/user');
const {normalizeErrors} = require('../helper/mongooseError')
const config = require('../config/dev');
const stripe = require('stripe')(config.STRIPE_SK);

exports.getPendingPayments = function(reg, res) {
    const user = res.locals.user;

    Payment.where({toUser:user})
       .populate({
           path:'booking',
           populate: {path: 'rental'}
       })

       .populate('fromUser')
       .exec(function(err, foundPayments){
        if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
          }
          return res.json(foundPayments);
       })

}
exports.confirmPayment = function(req, res) {
    const payment = req.body;
    const user = res.locals.user;
  
    Payment.findById(payment._id)
      .populate('toUser')
      .populate('booking')
      .exec(async function(err, foundPayment) {
  
        if (err) {
          return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
  
        if (foundPayment.status === 'pending' && user.id === foundPayment.toUser.id) {
  
          const booking = foundPayment.booking;
  
          const charge = await stripe.charges.create({
            amount: booking.totalPrice * 100,
            currency: 'usd',
            customer: payment.fromStripeCustomerId
          })
  
          if (charge) {
            Booking.update({_id: booking}, { status: 'active'}, function(){});
  
            foundPayment.charge = charge;
            foundPayment.status = 'paid';
  
            foundPayment.save(function(err) {
              if (err) {
                return res.status(422).send({errors: normalizeErrors(err.errors)});
              }
  
              User.update({_id: foundPayment.toUser}, { $inc: {revenue: foundPayment.amount}}, function(err, user){
                if (err) {
                  return res.status(422).send({errors: normalizeErrors(err.errors)});
                }
  
                return res.json({status: 'paid'});
              })
            })
          }
        }
      });
  }
