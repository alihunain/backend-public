// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
// create a schema
var OwnerSchema = new Schema({
  ownerfirstname: String,
  ownerlastname: String,
  ownergovids : [{"documentname": { type: String , default: ""}, "filename":{ type: String, default: ""}}],
  ownerprofilepic: String,
  owneraddress : String,
  password:String,
  userType : {type : String , default: 'owner'},
  ownerphoneno : String,
  username: { type: String, lowercase: true, required: true, unique: true },
  email: { type: String, lowercase: true, required: true, unique: true },
  status: { type: Boolean, default: false },
  created_at : { type: Date, default: Date.now }, 
  updated_at : { type: Date, default: Date.now },
  ownerpoints : { type: Number, default: 15 },
  fcmToken :[],
  image: String
});

// the schema is useless so far
// we need to create a model using it
OwnerSchema.plugin(passportLocalMongoose);
var Owner = mongoose.model('Owner', OwnerSchema);

// make this available to our users in our Node applications
module.exports = Owner;