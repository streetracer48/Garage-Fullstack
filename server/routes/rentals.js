const express = require('express');
const Rental = require('../models/rental')

const router = express.Router();

router.post('', function(req,res) {
    const rental = new Rental(req.body);
    rental.save((err,doc) => {
        if(err) return res.json({
              success:false,
              err
        });
        res.status(200).json({
              success:true,
              rental:doc
        })

   })
});

module.exports = router