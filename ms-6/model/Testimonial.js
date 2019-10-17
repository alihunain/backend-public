var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var TestimonialSchema = new Schema({
    name: String,
    image: String,
    description: String
   });

var Testimonial = mongoose.model('Testimonial', TestimonialSchema);

module.exports = Testimonial;