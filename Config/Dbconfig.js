const Mongoose          = require("mongoose");

Mongoose.connect('mongodb://localhost:27017/CSSE' , { useNewUrlParser: true } , (err) => {
    if(err){
        console.log(err);
        process.exit(-1);
    }
    console.log("connected to the DB");
})

/**
 *  Singleton Design Pattern.
 *  It will only exist as a single instance.
 */
module.exports = Mongoose;
