const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev')

const Rental = require('./models/rental')


mongoose.connect(config.DB_URL)


const app = express();

const PORT = process.env.PORT || 3001;

app.listen(3001, function() {
    console.log('our app is runing port 3001');
})