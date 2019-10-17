var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MealdaayCharges = new Schema({
    itemcharge : { type: Number, required: true, default: 0},   
    mealpackagecharge : { type: Number, required: true, default: 0},
    combocharge :{type :Number,required:true,default:0}      
});

var Config = mongoose.model('MealdaayCharges', MealdaayCharges);
module.exports = Config;