var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var MultilanguageSchema = new Schema({
    name:  { type: String, required: true },
    abbrivation:  { type: String, required: true },
    currency:  { type: String, required: true },
    
});

var Multilanguage = mongoose.model('Multilanguage', MultilanguageSchema);

module.exports = Multilanguage;