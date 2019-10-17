var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deliveryChargesSchema = new Schema({
    itemcharge : { type: Number, required: true, default: 0},   
    mealpackagecharge : { type: Number, required: true, default: 0}      
});

var Config = mongoose.model('Deliverycharges', deliveryChargesSchema);
module.exports = Config;