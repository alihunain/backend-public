var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var menuModel = require('../model/Kitchenmenu.js');
var menuModel = require('../model/combo.js');

var WeekMonthSchema = new Schema({
    name: {type: String, required: true},
    type : {type : String},
    kitchenId: {type: Schema.Types.ObjectId, ref:'Menu', required: true},
    daysforweek : String,
    description:  String,
    dayandmenus : [],
    startdate:  String,
    enddate:  String,
    discount:  String,
    status: { type: Boolean, default: false },
    totalprice: String,
    packageprice: String,
    image: String,
    combo: [{type: Schema.Types.ObjectId, ref:'Combo'}],
    comboprice : String
});

var WeekMonth = mongoose.model('MealPackage', WeekMonthSchema);

module.exports = WeekMonth;