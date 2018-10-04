const Mongoose          = require("mongoose");
const Float             = require("mongoose-float");
const Schema            = Mongoose.Schema;

const SiteShema = new Schema({

    siteName : {
        type : String,
        require : true
    },
    address : {
        type : String,
        require : true
    },
    items : {
        type : Array,
        require : true
    },
    storageCapacity :{
        type :Float,
        require : true
    },
    currentCapacity : {
        type : Float,
        require :true
    },
    siteManager : {
        type : String,
        require : false
    }
});

Mongoose.model('Site' , SiteShema);

module.exports = Mongoose;