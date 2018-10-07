const Mongoose              = require("../Model/Request");
const RequestShema          = Mongoose.model("Request");

var RequestContoller = function(){

    this.createRequest = (Data) => {
        return new Promise((resolve,reject) => {

            var newRequest = new RequestShema({
                itemName:Data.itemName,
                qty:Data.qty,
                completed:false,
                approved:false
            });

            newRequest.save()
            .then(() => {
                resolve({"status":"201","message":"Request Created"})
            })
            .catch((err) => {
                reject({"status":"404","message":"Err "+err});
            });
        })
    }


    this.getRequest = () => {
        return new Promise((resolve,reject) => {

            RequestShema.find().exec()
            .then((data) => {
                if(data.length !== 0){
                    resolve({"status":"200","message":data});
                }
                else{
                    resolve({"status":"205","message":"Can not find data"});
                }
            })
            .catch((err) => {
                reject({"status":"400" , "message":"Err "+err});
            });

        })
    }
    
}

module.exports = new RequestContoller();