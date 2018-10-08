const Mongoose = require("mongoose");
const Flaot = require("mongoose-float");
const Schema = Mongoose.Schema;

const OrderShema = new Schema({

    orderID: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    requestId: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unitPrice: {
        type: Number,
        required: true
    },
    orderDate:{
        type:String,
        required:true
    },
    paid:{
        type:Boolean,
        required:false
    }
});

Mongoose.model('Order', OrderShema);

module.exports = Mongoose;