var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CoverageConfigSchema = new Schema({
    ssl_merchant_id : { type: String, required: true},
    ssl_user_id : { type: String, required: true},
    ssl_pin : { type: String, required: true}
});

var CoverageConfig = mongoose.model('CoverageConfig', CoverageConfigSchema);
module.exports = CoverageConfig;