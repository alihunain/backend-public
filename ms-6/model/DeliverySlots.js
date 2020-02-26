var mongoose = require('mongoose');
var Schema = mongoose.Schema;
CountrySchema = require('../model/Country.js');
StateSchema = require('../model/State.js');

// create a schema
var DeliverySlots = new Schema({
    day:String,
	state:  { type: Boolean, default :false },
	StartTime:String,
	EndTime: String,
});


var DeliverySlots = mongoose.model('DeliverySlots', DeliverySlots);

module.exports = DeliverySlots;