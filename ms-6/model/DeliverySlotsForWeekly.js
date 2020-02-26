var mongoose = require('mongoose');
var Schema = mongoose.Schema;
CountrySchema = require('../model/Country.js');
StateSchema = require('../model/State.js');

// create a schema
var DeliverySlotsForWeekly = new Schema({
    dtype:String,
    Firstday: String,
    FirstStartTime: String,
    FirstEndTime:String,
    Secondday: String,
    SecondStartTime: String,
    SecondEndTime:String,   
    state:  { type: Boolean, default :false },
});


var DeliverySlotsForWeekly = mongoose.model('DeliverySlotsForWeekly', DeliverySlotsForWeekly);

module.exports = DeliverySlotsForWeekly;