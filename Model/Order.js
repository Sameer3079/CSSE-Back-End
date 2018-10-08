const Mongoose = require("mongoose")
const Schema = Mongoose.Schema

const OrderShema = new Schema({
    orderId: { type: String, required: true },
    itemName: { type: String, required: true },
    requestId: { type: String, required: true },
    quantity: { type: Number, require: true },
    unitPrice: { type: Number, required: true },
    orderDate: { type: Date, required: true },
    paid: { type: Boolean, required: true }
})

Mongoose.model('Order', OrderShema)

module.exports = Mongoose