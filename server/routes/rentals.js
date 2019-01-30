const express = require('express');
const Rental = require('../models/rental')

const router = express.Router();

router.post('', function(req,res) {
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


router.get('/:id', function(req, res) {

    const  rentalId= req.params.id;
    Rental.findById(rentalId, function(err, doc) {

        if(err) return res.status(422).send({
            success:false,
            errors:[{title:'Rental Error', detail:'could not find rental'}]
      });
      res.status(200).json({
            success:true,
            rental:doc
      })
})

})


module.exports = router