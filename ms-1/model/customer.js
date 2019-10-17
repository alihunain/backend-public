var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
  firstname: String,
  lastname: String,
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cellphone: { type: String, required: true },
  homephone: { type: String, required: true },
  status: { type: Boolean, default: true }
});

var Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;