var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Subscribers = new Schema({
    email : { type: String, required: true,unique:true,  validate: {
        validator: function(v) {
          return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
        }}},        
});

var Subscribers = mongoose.model('Subscribers', Subscribers);
module.exports = Subscribers;