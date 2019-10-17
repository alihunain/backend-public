var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var menuModel = require('../model/kitchenMenu.js');

var offerSchema = new Schema({
    name : { type: String, required: true},   
    kitchenId : { type: String, required: true},   
    type: String,
    percentorpricevalue : String,
    couponcode : String,
    indate : String,
    expirydate : String,
    special : Boolean    
});

var Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;