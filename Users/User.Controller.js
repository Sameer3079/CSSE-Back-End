const Mongoose          = require("../Model/User");
const UserSchema        = Mongoose.model("User");

var UserController = function(){

    this.addUser = (Data) => {
        return new Promise((resolve,reject) => {
            UserSchema.find({email:Data.email}).exec()
            .then((data) => {
                if(data.length === 0){

                    var user = new UserSchema({
                        email : Data.email,
                        userName : Data.userName,
                        password : Data.password,
                        creationDate : Data.creationDate
                    });

                    user.save()
                    .then(() => {
                        resolve({"status":201 , "message":"User Created"});
                    })
                    .catch((err) => {
                        reject({"status":404 , "message":"Err "+err});
                    });
                }
            })
            .catch((err) => {
                reject({"status":999 , "message":"User Already Exists"})
            });
        })
    }
}

module.exports = new UserController();