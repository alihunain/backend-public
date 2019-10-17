// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CustomerModel  =  require("../model/customer.js");


// create a schema
var CustomerSchema = new Schema({
    referralfrom : [{type: Schema.Types.ObjectId, ref:'customer', required: true}],
    status :  { type: Boolean, default: false },
    emailto : {type: String, default: true, lowercase: true},
    type : String
    });


// the schema is useless so far
// we need to create a model using it
var Referral = mongoose.model('Referral', CustomerSchema);

// make this available to our users in our Node applications
module.exports = Referral;