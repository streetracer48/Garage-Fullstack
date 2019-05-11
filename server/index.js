const express = require('express');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/dev')
// const Rental = require('./models/rental')

//Route

const rentalRoutes = require('./routes/rentals');
const userRoutes = require('./routes/users');
const bookingRoutes = require('./routes/bookings');
const reviewRoute = require('./routes/review')
const paymentRoutes = require('./routes/payments')

mongoose.connect(config.DB_URL)

const app = express();
// app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())



// app.get('/rentals', function(req, res) {
//     res.json({'success':true})
// })

//Routes

app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/review', reviewRoute);
app.use('/api/v1/payment', paymentRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
    console.log('our app is runing port 3001');
})