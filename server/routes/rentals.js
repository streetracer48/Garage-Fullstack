
const express = require('express');
const UserCtr = require('../controllers/user')
const User = require('../models/user')
const {normalizeErrors} = require('../helper/mongooseError')
const Rental = require('../models/rental')
const router = express.Router();

router.get('/manage', UserCtr.authMiddleware, function(req, res) {
      const user= res.locals.user;
      //  console.log(user)
       Rental.where({user})
       .populate('bookings')
       .exec(function(err, foundRentals){
            if (err) {
              return res.status(422).send({errors: normalizeErrors(err.errors) });
            }
        
              res.json(foundRentals)
          });
})



router.post('', UserCtr.authMiddleware, function(req,res)
 {
      const { title, city, street, category, image, shared, bedrooms, description, dailyRate } = req.body;
      const user = res.locals.user;

     const rental = new Rental({title, city, street, category, image, shared, bedrooms, description, dailyRate});
    rental.user = user;
    Rental.create(rental,(err,newRental) => {

    Rental.create(rental,(err,doc) => {

        if(err) return res.status(422).send({
              success:false,
              errors:[{title:'Rental Error', detail:'could not added rental on database'}]
        });

        User.update({_id:user.id}, {$push:{rentals:newRental}}, () => {

        })

        res.status(200).json({
              success:true,
              rental:newRental
        })

   })
});

 })


router.get('', function(req, res) 
{

       const city = req.query.city;
       const query= city ? {city:city.toLowerCase()}:{};

       Rental.find(query)
       .select('-bookings')
       .exec(function(err, foundRentals)
       {
            if(err)
            {
                  return res.status(422).send({errors:normalizeErrors(err.errors)});
            } 

            if(city && foundRentals.length === 0)
            {
                  return res.status(422).send({errors: [{title: 'No Rentals Found!', detail: `There are no rentals for city ${city}`}]});

            }

            return res.json(foundRentals);
       })

}) 


      // Rental.find({}, function(err, foundRental) {
      //     if(err) return res.status(422).send({
      //   });
      //   res.status(200).json({
      //       foundRental
      //   })

router.get('', function(req, res) 
{

       const city = req.query.city;
       const query= city ? {city:city.toLowerCase()}:{};

       Rental.find(query)
       .select('-bookings')
       .exec(function(err, foundRentals)
       {
            if(err)
            {
                  return res.status(422).send({errors:normalizeErrors(err.errors)});
            } 

            if(city && foundRentals.length === 0)
            {
                  return res.status(422).send({errors: [{title: 'No Rentals Found!', detail: `There are no rentals for city ${city}`}]});

            }

            return res.json(foundRentals);
       })

      // Rental.find({}, function(err, foundRental) {
      //     if(err) return res.status(422).send({
      //   });
      //   res.status(200).json({
      //       foundRental
      //   })

  
  })


router.get('/:id', function(req, res) {

    const  rentalId= req.params.id;

    Rental.findById(rentalId)
    .populate('user', 'username -_id')
    .populate('bookings', 'startAt endAt -_id')
    .exec((err, foundRental) =>{

      if(err) 
      return res.status(422).send({
            success:false,
            errors:[{title:'Rental Error', detail:'could not find rental'}]
      });

      return res.json(foundRental);

    })
})


router.delete("/:id", UserCtr.authMiddleware, function(req, res){
      let user = res.locals.user;
      // console.log(user.id);
      Rental.findById(req.params.id)
             .populate('user','_id')
             .populate({
                   path:'bookings',
                   select:'startAt',
                   match:{startAt:{ $gt:new Date()}}
             })
             .exec(function(err, foundRental){
                   if (err) {
                         return res.status(422).send({
                               success: false,
                               errors: [{ title: 'Rental Error', detail: 'could not find rental' }]
                         });

                   }
                   console.log(foundRental);
                   if(user.id !== foundRental.user.id)
                   {
                        return res.status(422).send({errors: [{title: 'Invalid user!', detail: `you are not rental owner!`}]});

                   }

                   if(foundRental.bookings.length >0){

                        return res.status(422).send({errors: [{title: 'Active Bookings!', detail: `Can'not delete rental with active bookings!`}]});

                   }
                   foundRental.remove(function(err){
                         if(err){
                              return res.status(422).send({errors:normalizeErrors(err.errors)});
                         }

                         res.status(200).json({
                              'success':'deleted'
                          })
                   })


             })
})






module.exports = router