var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var RatingSchema = new Schema({
    restaurantId:  { type: Schema.Types.ObjectId, ref:'Kitchen', required: true},
    customerId: String,   
    orderPackagingRating : {"type": Number, "default": 0}, 
    deliveryTimeRating : {"type": Number, "default": 0},
    valueOfTimeRating : {"type": Number, "default": 0},
    review: String,
    created_at: { "type": Date, "default": Date.now }
});

// we need to create a model using it
var Rating = mongoose.model('Rating', RatingSchema);

// make this available to our users in our Node applications
module.exports = Rating;