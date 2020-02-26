var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdminSettings = new Schema({
    orderNow: { type: Boolean, default: false },
    cashOnDelivery : {type: Boolean, default:false},
    cutOff:{type: String}
});

var AdminSettings = mongoose.model('AdminSettings', AdminSettings);

module.exports = AdminSettings;