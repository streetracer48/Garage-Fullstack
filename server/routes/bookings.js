const express =  require('express');
const router = express.Router();
const BookingCtr = require('../controllers/booking');
const UserCtr = require('../controllers/user')

router.post('',BookingCtr.createBooking);


module.exports = router;