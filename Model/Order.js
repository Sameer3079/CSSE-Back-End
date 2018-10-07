const Mongoose = require("mongoose");
const Flaot = require("mongoose-float");
const Schema = Mongoose.Schema;

const OrderShema = new Schema({

    sequential: {
        type: String,
        required: true
    },
    quentity : {
        type : Number,
        required : true
    },
    items : {
        type : String,
        required : true
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