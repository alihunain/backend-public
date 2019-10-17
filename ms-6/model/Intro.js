var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var IntroSchema = new Schema({
	name : String,
    image:  { type: String, required: true },
    description : String,
});

var Intro = mongoose.model('Intro', IntroSchema);

module.exports = Intro;