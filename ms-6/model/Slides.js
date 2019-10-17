var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var PageSchema = new Schema({
    image:  { type: String, required: true }
});

var page = mongoose.model('slides', PageSchema);

module.exports = page;