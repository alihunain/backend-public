// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var KitchenModel = require("../model/Owner.js");

// create a schema
var RefSchema = new Schema({
    referralfrom : {type: Schema.Types.ObjectId, ref:'Owner', required: true},
    status :  { type: Boolean, default: false },
    emailto : { type : String, lowercase: true },
    type : String
});

// the schema is useless so far
// we need to create a model using it
var Referral = mongoose.model('Referral', RefSchema);

// make this available to our users in our Node applications
module.exports = Referral;