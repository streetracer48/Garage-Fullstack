const Payment = require('../models/payment');
const Booking = require('../models/booking');

const Rental = require('../models/rental');
const User = require('../models/user');
const {normalizeErrors} = require('../helper/mongooseError')
const config = require('../config');


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

exports.confirmPayment =function(req, res) {

    const payment= req.body;
    const user =res.locals.user;

 Payment.findById(payment._id)
        .populate('toUser')
        .populate('booking')


}