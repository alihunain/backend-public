var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema

var OrderSchema = new Schema({
    restaurantid: { type: String, required: true },
    customerid: { type: String, required: true },
    ordertiming: Object,
    note: String,
    ordertype: String,
    coupon: Object,
    combo: [],
    items: [],
    package: [],
    paymenttype: String,
    driverinst:String,
    deliveryCharges: Number,
    total: Number,
    subtotal: Number,
    tax: Number,
    discount: Number,
    fulladdress: Object,
    driverDetail: Object,
    cardinfo: Object,
    status: { type: String, default: 'received' },
    created_at: { type: Date },
caterdaaycharges:{type:Number,default:0},
    cardPaidStatus: Object,
    timezone: String,
    menuStatus: { type: Boolean, default: false },
    currency: String,
    paid:{ type:Boolean,default:false}
});

var Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
