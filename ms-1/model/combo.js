var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var menuModel = require('../model/Kitchenmenu.js');
var menuModel = require('../model/Item.js');

var ComboSchema = new Schema({
    name : { type: String, required: true},   
    kitchenId : { type: String, required: true},
    menuId  : [{ type: Schema.Types.ObjectId, ref:'Menu', required: true}],
    description : String,
    finalcomboprice : String,
    totalprice : String,
    image : String,
    status: { type: Boolean, default: false }    
});

var Combo = mongoose.model('Combo', ComboSchema);

module.exports = Combo;