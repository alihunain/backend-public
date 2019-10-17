var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var order = require('../model/Order.js');

// create a schema
var RatingSchema = new Schema({
    orderId: { type: Schema.Types.ObjectId, ref:'Order', required: true},
    restaurantId:  String,
    customerId: String,   
    average: Number,
    orderPackagingRating : {"type": Number, "default": 0}, 
    deliveryTimeRating : {"type": Number, "default": 0},
    valueOfTimeRating : {"type": Number, "default": 0},
    review: String,
    created_at: { "type": Date, "default": Date.now },
    items: [],
    combo: [],
    package: [],
    ratingUpdateStatus: {type: Boolean, default: false}

});

// we need to create a model using it
var Rating = mongoose.model('Rating', RatingSchema);

// make this available to our users in our Node applications
module.exports = Rating;