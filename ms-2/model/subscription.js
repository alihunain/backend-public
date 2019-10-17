// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var SubscriptionSchema = new Schema({
    email : { type : String, lowercase: true, unique: true }
});

// the schema is useless so far
// we need to create a model using it
var Subscription = mongoose.model('Subscription', SubscriptionSchema);

// make this available to our users in our Node applications
module.exports = Subscription;