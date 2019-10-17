var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IngredientsOrder = new Schema({
    items: [
      { 
      categoryname : {type :String},
      cid: {type:Schema.Types.ObjectId,ref:'Category'},
      ingredient:  [
        {
          ingid:{type:Schema.Types.ObjectId,ref:'Ingredients'},
          quantity:{type:String},
          ingPrice :{type:String},
          name :{type:String}
        }
      ], 
      }
    ],
    buyerType :{
      type:String,
      enum:['Chef','Customer'],
      default:'Chef'
    },
    status:{
      type:String,
      enum:['Received','Rejected','Accepted',' DriverRequested','OnTheWay','OrderDelivered'],
      default:'received'
    },
    note:String,
    deliveryCharges: Number,
    paymenttype : String,
    fulladdress :  Object,
    chefdetail :  {type: Schema.Types.ObjectId, ref:'Owner'},
    customerId :  {type: Schema.Types.ObjectId, ref:'Customer'},
    totalprice :  {type:String},
    deliveryType : {type:String},
    ordertiming: Object
});

var IngredientsOrder = mongoose.model('IngredientsOrder', IngredientsOrder);

module.exports = IngredientsOrder;