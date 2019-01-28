const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev')
const Rental = require('./models/rental')


const rentalRoutes = require('./routes/rentals');


mongoose.connect(config.DB_URL)


const app = express();


// app.get('/rentals', function(req, res) {
//     res.json({'success':true})
// })

//Routes

app.use('/api/v1/rentals', rentalRoutes);



const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
    console.log('our app is runing port 3001');
})