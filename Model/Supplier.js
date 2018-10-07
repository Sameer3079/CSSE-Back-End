let mongoose = require('mongoose');
let schema = mongoose.Schema

const Supplier = new schema({
    supplierName : {
        type : String,
        required : true
    },
    bankAccount : {
        type : String,
        required : true
    },
    nic : {
        type : String,
        required : true

    },
    address : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    items : {
        type : String,
        required : true
    },
    blackList : {
        type : Boolean,
        required : true
    }
});

mongoose.model('Supplier', Supplier)

module.exports = mongoose
