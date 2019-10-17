var mongoose = require('mongoose');
var Schema = mongoose.Schema;
CountrySchema = require('../model/Country.js');

// create a schema
var StateSchema = new Schema({
    stateCode: String,
    name: String,
    countryId:  { type: Schema.Types.ObjectId, ref: 'Country' }
});

var State = mongoose.model('State', StateSchema);

module.exports = State;