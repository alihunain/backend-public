var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var KitchenmenuSchema = new Schema({
    name: { type: String, required: true},
    kitchenId: { type: String, required: true},
    image:  String,
    cuisines : []   
});

var Kitchenmenu = mongoose.model('Kitchenmenu', KitchenmenuSchema);

module.exports = Kitchenmenu;