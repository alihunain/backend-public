var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var menuModel = require('../model/Kitchenmenu.js');

var MenuSchema = new Schema({
    name: { type: String, required: true},
    description: String,
    kitchenId: { type: String, required: true},
    menuId: { type: Schema.Types.ObjectId, ref:'Kitchenmenu', required: true},
    price: Number,
    image: String,
    options: [],
    categorylabelinfo : String,
    status: { type: Boolean, default: false }   
});

var Menu = mongoose.model('Menu', MenuSchema);

module.exports = Menu;