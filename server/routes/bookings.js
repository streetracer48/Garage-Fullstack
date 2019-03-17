const express =  require('express');
const router = express.Router();
const BookingCtr = require('../controllers/booking');
const UserCtr = require('../controllers/user')

router.post('',UserCtr.authMiddleware,BookingCtr.createBooking);
router.get('/manage', UserCtr.authMiddleware, BookingCtr.getUserBookings)

module.exports = router;