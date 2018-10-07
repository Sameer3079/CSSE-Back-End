const Mongoose          = require("../Config/Dbconfig");
const Schema            = Mongoose.Schema;


const RequestSchema = new Schema({

    itemName : {
        type : String,
        required :true
    },
    qty : {
        type : Number,
        required : true
    },
    approved : {
        type : Boolean,
        required : true
    },
    completed : {
        type : Boolean,
        required : true
    }

});

Mongoose.model("Request" , RequestSchema);

module.exports = Mongoose;