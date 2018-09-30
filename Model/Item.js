const Mongoose          = require("mongoose");
const Float             = require("mongoose-float");
const Schema            = Mongoose.Schema;

const ItemSchema = new Schema({
    itemName : {
        type : String,
        required : true
    },
    categoryId : {
        type : String,
        required : true
    },
    price : {
        type : Float,
        required : true
    },
    deliveryInformation : {
        type : String,
        required : true
    },
    isRestricedItem : {
        type: Boolean,
        required : true
    }
});


Mongoose.model('Item' , ItemSchema);
module.exports = Mongoose;