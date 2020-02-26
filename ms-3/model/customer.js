var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var CustomerSchema = new Schema({
  firstname: String,
  lastname: String,
  username: { type: String, lowercase: true, required: true },
  email: { type: String, lowercase: true, required: true, unique: true },
  password: { type: String },
  dob: String,
  homephone: String,
  cellphone: String,
  gender : String,
  dtype: {type: String, default: 'Customer'},
  /*termsandcondition : String,*/
  status: { type: Boolean, default: false },
  customerpoints : { type: Number, default: 15 },
  customerfavrestro : [],
  fcmToken:[],
  /*timezone: String,*/
  profilePic: String,
  accounttype: {type: String, default: 'customer'},
  // cardinfo: [{token:String, default:false, cardnumber:String,cardtype:String}],
  cardinfo: [{ cardtype:String,token:String, cardnumber : String ,default: { type: Boolean, default: false }}],
  customeraddresses : [{ lat : String, lng : String, phoneno : String, landline : String, address : String, 
                      landmark : String, city : String, zipcode : String, country : String, default: {type: Boolean, default: false} },{ usePushEach: true }],

});
CustomerSchema.plugin(passportLocalMongoose);
var Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;