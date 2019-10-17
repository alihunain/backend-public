var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var CuisinesSchema = new Schema({
    name:  { type: String, required: true },
    image:  { type: String }
});

var Cuisines = mongoose.model('cuisines', CuisinesSchema);

module.exports = Cuisines;
