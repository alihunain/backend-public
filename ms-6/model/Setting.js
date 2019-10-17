// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var SettingSchema = new Schema({
  adminpasscomplexity : {name: "", regex : ""},
  ownerpasscomplexity : {name: "", regex : ""},
  customerpasscomplexity : {name: "", regex : ""},
});

// the schema is useless so far
// we need to create a model using it
var Settings = mongoose.model('Settings', SettingSchema);

// make this available to our users in our Node applications
module.exports = Settings;