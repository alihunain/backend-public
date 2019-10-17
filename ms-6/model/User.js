// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

// create a schema
var userSchema = new Schema({
  firstname: String,
  lastname: String,
  cancelPolicy: String,
  reschedulingPolicy: String,
  deliveryChargesPolicy: String,
  paymentPolicy: String,
  username: { type: String, lowercase: true, required: true, unique: true },
  email: { type: String, lowercase: true, required: true, unique: true },
  status: { type: Boolean, default: true },
  created_at: Date,
  updated_at: Date,
  dtype: {type: String, default: 'admin'},
  adminpasscomplexity : {name: {type: String, default : "none"}, regex : ""},
  ownerpasscomplexity : {name: {type: String, default : "none"}, regex : ""},
  customerpasscomplexity : {name: {type: String, default : "none"}, regex : ""},
});

userSchema.plugin(passportLocalMongoose);

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;