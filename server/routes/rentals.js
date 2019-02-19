const express = require('express');
const Rental = require('../models/rental')
const UserCtr = require('../controllers/user')

const router = express.Router();

router.post('', UserCtr.authMiddleware, function(req,res) {
    const rental = new Rental(req.body);
    rental.save((err,doc) => {
        if(err) return res.status(422).send({
              success:false,
              errors:[{title:'Rental Error', detail:'could not added rental on database'}]
        });
        res.status(200).json({
              success:true,
              rental:doc
        })

   })
});


router.get('', function(req, res) {
      Rental.find({}, function(err, foundRental) {
  
          if(err) return res.status(422).send({
              success:false,
              errors:[{title:'Rental Error', detail:'could not find rental'}]
        });
        res.status(200).json({
            foundRental
        })
  })
  
  })


router.get('/:id', function(req, res) {

    const  rentalId= req.params.id;
    Rental.findById(rentalId, function(err,foundRental) {

        if(err) return res.status(422).send({
            success:false,
            errors:[{title:'Rental Error', detail:'could not find rental'}]
      });
      res.status(200).json({
            foundRental
      })
})

})


module.exports = router