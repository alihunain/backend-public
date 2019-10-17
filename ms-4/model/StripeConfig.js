var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StripeConfigSchema = new Schema({
    keypublishable : { type: String, required: true},   
    keysecret : { type: String, required: true}      
});

var Config = mongoose.model('StripeConfig', StripeConfigSchema);
module.exports = Config;