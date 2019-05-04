const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    rating: Number,
    text: String,
    createdAt: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    rental: { type: Schema.Types.ObjectId, ref: 'Rental'}
  });

  module.exports = mongoose.model('Review', reviewSchema);