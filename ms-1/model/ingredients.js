var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Ingredients = new Schema({
    name: { type: String, required: true,unique: true},
    basePrice : {type: Number},
    chefPrice :{type: Number},
    customerPrice :{type:Number},
    image:{type:String},
    retailPrice:{type:Number},
    category:{type: Schema.Types.ObjectId, ref:'Category', required: true}
});

var Ingredients = mongoose.model('Ingredients', Ingredients);

module.exports = Ingredients;