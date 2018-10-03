const Mongoose      = require("mongoose");
const Schema        = Mongoose.Schema;

const SupplierSchema = new Schema({
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
        type : Array,
        required : true
    },
    availability : {
        type : Boolean,
        required : true
    }
});

Mongoose.model('Supplier' , SupplierSchema);

module.exports = Mongoose;