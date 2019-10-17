var mongoose = require('mongoose');
var Schema = mongoose.Schema;
CountrySchema = require('../model/Country.js');
StateSchema = require('../model/State.js');

// create a schema
var CitySchema = new Schema({
    cityName  :  { type: String, required: true, lowercase: true, trim: true},
	stateId:  { type: Schema.Types.ObjectId, ref: 'State' },
	countryId:  { type: Schema.Types.ObjectId, ref: 'Country' }
});


var City = mongoose.model('City', CitySchema);

module.exports = City;