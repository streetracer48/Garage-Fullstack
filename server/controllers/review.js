const User = require('../models/user');
const Rental = require('../models/rental');

const Review = require('../models/review');
const Booking = require('../models/booking');
const moment = require('moment');

const {normalizeErrors} = require('../helper/mongooseError')


exports.createReview = function(req, res) {

    const reviewData = req.body;
    const {bookingId} = req.query;
    const user = res.locals.user;

    console.log(bookingId)
    Booking.findById(bookingId)
            .populate({ path:'rental', populate:{path:'user'}})
            .populate('review')
            .populate('user')
            .exec(async(err, foundBooking) => {
                if (err) {
                  // console.log(err)
                    return res.status(422).send({errors: normalizeErrors(err.errors)});
                  }

                const {rental} = foundBooking

                if(rental.user.id === user.id) {
                    return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'Cannot create review on your Rental!'}]});
                }
              if(foundBooking.user.id !==user.id) {
                return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'Cannot write review on someone else booking'}]});
              }

              const timeNow = moment();
              const endAt=moment(foundBooking.endAt);

              // if(!endAt.isBefore(timeNow)){
              //   return res.status(422).send({errors: [{title: 'Invalid Date!', detail: 'You can place the review only after your trip is finished'}]});
              // }
   if(foundBooking.review) {
    return res.status(422).send({errors: [{title: 'Booking Error!', detail: 'Only one review per booking is allowed!'}]});
   }

   const review = new Review(reviewData)
   review.user= user;
   review.rental = rental,
   foundBooking.review = review;

   try {
     console.log(foundBooking)
       await foundBooking.save();
       const saveReview = await review.save();
       return res.json(saveReview)
   }

   catch (err) {
    return res.status(422).send({errors: normalizeErrors(err.errors)});
   }
    })

}