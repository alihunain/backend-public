// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var OwnerSchema = new Schema({
  ownerfirstname: String,
  ownerlastname: String,  
  owneraddress : String,
  userType : {type : String , default: 'partner' },
  ownerphoneno : String,
  username: { type: String, lowercase: true, required: true, unique: true },
  email: { type: String, lowercase: true, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: Boolean, default: false },
  created_at:{ type: Date, default: Date.now }, 
  updated_at:{ type: Date, default: Date.now },
  OwnerId : { type: Schema.Types.ObjectId, ref:'Owner', required: true},  
});

// the schema is useless so far
// we need to create a model using it
var Owner = mongoose.model('Partner', OwnerSchema);

// make this available to our users in our Node applications
module.exports = Owner;