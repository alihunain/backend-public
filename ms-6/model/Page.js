var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var PageSchema = new Schema({
    title:  { type: String, required: true },
    url:  { type: String, required: true },
    description: { type: String, required: true }
});

var page = mongoose.model('pages', PageSchema);

module.exports = page;