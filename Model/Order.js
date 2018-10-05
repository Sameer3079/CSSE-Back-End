const Mongoose = require("mongoose");
const Flaot = require("mongoose-float");
const Schema = Mongoose.Schema;

const OrderShema = new Schema({

    sequential: {
        type: String,
        required: true
    },
    items:[ {
        catagory: {
            type: String,
            required: true
        },
        itemName: {
            type: String,
            required: true
        },
        quantity: {
            type: String,
            required: true
        },
        amount: {
            type: String,
            required: true
        }
    }],
    orderStatus: {
        type: String,
        required: true
    },
    orderDate: {
        type: Date,
        require: true
    },
    isDraftPurchaseOrder: {
        type: Boolean,
        required: true
    },
    onHold: {
        type: Boolean,
        required: true
    }
});

Mongoose.model('Order', OrderShema);

module.exports = Mongoose;