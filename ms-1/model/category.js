var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Category = new Schema({
    image:{type:String},
    name: { type: String, required: true,unique: true},
    items :[{type: Schema.Types.ObjectId, ref:'Ingredients'}]
});

var Category = mongoose.model('Category', Category);

module.exports = Category;