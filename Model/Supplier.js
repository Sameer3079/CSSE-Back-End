let mongoose = require('mongoose')
let schema = mongoose.Schema

let supplierSchema = new schema({
    supplierId: { required: true, type: String },
    name: { required: true, type: String },
    bankAccount: { required: true, type: String },
    address: { required: true, type: String },
    email: { required: true, type: String },
    contactNo: { required: true, type: String },
    items: [{ required: false, type: String }],
    available: { required: true, type: Boolean }
})

mongoose.model('Supplier', supplierSchema, 'suppliers')

module.exports = mongoose