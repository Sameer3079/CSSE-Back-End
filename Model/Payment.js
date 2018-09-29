const Mongoose      = require("../Config/Dbconfig");
const Schema        = Mongoose.Schema;

const PaymentSchema = new Schema({

    orderId:{
        type:Number,
        required:true
    },
    supplierName:{
        type:String,
        required:true
    },
    bankAccountNumber:{
        type:Number,
        required:true
    },
    amount:{
        type:Number,
        required:true
    }

});

Mongoose.model('Payment' , PaymentSchema);

module.exports = Mongoose;