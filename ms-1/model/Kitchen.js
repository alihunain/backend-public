// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var KitchenSchema = new Schema({
  restaurantname: String,
  restaurantDescription: String,
  address: String,
  restaurantMax: String,
  restaurantMin:String,
  city: { type : String, lowercase: true, trim: true},
  ownerId : {type: Schema.Types.ObjectId, ref:'Owner', required: true},
  zipcode: String,
  country: {type : String, lowercase: true, trim: true},
  lat: String,
  lng: String,
  loc : {type: [Number], index: '2d'},
  state: String,
  phoneno1: Number,
  phoneno2: Number,
  phoneno3: Number,
  phoneno4: Number,
  logo: String,
  image: [],
  partners : [{
              firstname : String,
              lastname : String
            }],
  status: { type: Boolean, default: true },
  samedaydelivery:{type :Boolean, default:true},
  preorderforlater: { type: Boolean, default: true },
  preorderforlaterafterdays: { type: Number, default: 2 },
  preorderforlatertodays: { type: Number, default: 60 },
  mealpackageallowdays: { type: Number, default: 7 },
  created_at : { type: Date, default: Date.now }, 
  updated_at : { type: Date, default: Date.now }, 
  cuisines : [],
DeliveryCharges : { type : Number,default:0},
  activestatus : {type : Boolean, default: false},
  cancelPolicy: String,
  reschedulingPolicy: String,
  deliveryChargesPolicy: String,
  paymentPolicy: String,
  advertisementpolicy: String,
  advertisepolicychangesandlegal: String,
  advertisepromotions: String,
  openinghours : [
                  {name : {type : String , default: "monday"}, status: {type: Boolean, default: false}, times : { type : Array, default : [{open: {type: String, default: "12:00 AM"} , close: {type: String, default: "11:59 PM"}}]}},  
                  {name : {type : String , default: "tuesday"}, status: {type: Boolean, default: false}, times : { type : Array, default : [{open: {type: String, default: "12:00 AM"} , close: {type: String, default: "11:59 PM"}}]}},  
                  {name : {type : String , default: "wednesday"}, status: {type: Boolean, default: false}, times : { type : Array, default : [{open: {type: String, default: "12:00 AM"} , close: {type: String, default: "11:59 PM"}}]}},  
                  {name : {type : String , default: "thursday"}, status: {type: Boolean, default: false}, times : { type : Array, default : [{open: {type: String, default: "12:00 AM"} , close: {type: String, default: "11:59 PM"}}]}},  
                  {name : {type : String , default: "friday"}, status: {type: Boolean, default: false}, times : { type : Array, default : [{open: {type: String, default: "12:00 AM"} , close: {type: String, default: "11:59 PM"}}]}},  
                  {name : {type : String , default: "saturday"}, status: {type: Boolean, default: false}, times : { type : Array, default : [{open: {type: String, default: "12:00 AM"} , close: {type: String, default: "11:59 PM"}}]}},  
                  {name : {type : String , default: "sunday"}, status: {type: Boolean, default: false}, times : { type : Array, default : [{open: {type: String, default: "12:00 AM"} , close: {type: String, default: "11:59 PM"}}]}}
                 ],  
 openingstatus : {type: String, default:'open'},
 kitchenservices: Array,
 kitchencapacity : String,
 cateringcapacity : String,
 offerings : Array,
 fastestdelivery : {type : Boolean, default: true},
 minimumorder : {type: String, default: 0},
 mindeliveryime : String,
 bakeryitems : {type : Boolean, default: false},
 foodtype : Array,
 deliveryservice : {status : {type : Boolean, default: true}, value : ""},
 documentation : [{"documentname": { type: String , default: ""}, "filename":{ type: String, default: ""}}],
 bankinginformation : Array,
 tax: {status : {type: Boolean, default: false}, value : {type: Number, default: 0}},
 serviceAllow: {"daliymenuservice": {type: Boolean, default: true}, "cateringservice": {type: Boolean, default: false}, "mealpackageservice": {type: Boolean, default: false}, "comboservice": {type: Boolean, default: true}},
 completeprofilenameaddress : {type: Number, dafault : 0},
 completeprofileservice : {type: Number, dafault : 0},
 currency: { type : String, uppercase: true, trim: true },
 shortName: { type : String, uppercase: true, trim: true },
 payoutdetail : {"accountholdername": {type: String , default : ""}, "accountnumber": {type: String , default : ""}, "bankname": {type: String , default : ""}}
 });

// the schema is useless so far
// we need to create a model using it
var Kitchen = mongoose.model('Kitchen', KitchenSchema);

// make this available to our users in our Node applications
module.exports = Kitchen;
