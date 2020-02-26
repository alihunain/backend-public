var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AddOnSchema = new Schema({
    name : { type: String, required: true},   
    kitchenId : { type: String, required: true},
    description : String,
    finalprice : String,
    totalprice : String,
    image : String,
    status: { type: Boolean, default: false },
    perItemImpression : {type :Number, default : 0 }
},
{
  timestamps: true
});

var AddOn = mongoose.model('AddOn', AddOnSchema);

module.exports = AddOn;