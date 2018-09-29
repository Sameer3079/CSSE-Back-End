const Mongoose          = require("../Config/Dbconfig");
const Schema            = Mongoose.Schema;
const Bcrypt            = require("bcrypt");

const UserSchema = new Schema({
    email:{
        type : String,
        required : true
    },
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    creationDate:{
        type:Date,
        required:true
    }
});

UserSchema.static.hashPassword = function hashPassword(){
    return Bcrypt.compareSync(password,10);
}

UserSchema.methods.isValid = function(hashedpassword){
    return Bcrypt.compareSync(hashedpassword , this.password);
}

Mongoose.model('User' , UserSchema);

module.exports = Mongoose;
