const Mongoose          = require("../Model/Supplier");
const SupplierShema        = Mongoose.model("Supplier");

var SupplierController = function(){


    this.addSupplier = (Data) => {
        
        return new Promise((resolve,reject) => {
            var newSupplier = new SupplierShema({
                supplierName : Data.supplierName,
                bankAccount : Data.bankAccount,
                nic : Data.nic,
                address : Data.address,
                email : Data.email,
                phone : Data.phone,
                items : Data.items,
                availability : Data.availability,
                blckList : Data.blckList
            });

            newSupplier.save()
            .then(() => {
                resolve({"status":"200","message":"Supplier is created"});
            })
            .catch((err) => {
                reject({"status":"500","message":"Err "+err});
            });
        })
    }


    this.getAllSuppliers = () => {

        return new Promise((resolve, reject) => {

            SupplierShema.find().exec()
            .then((data) => {
                
                if(data.length !== 0 ){
                    resolve({"status":"200","message":data});
                }
                else{
                    resolve({"status":"205","message":"Can not find order"});
                }
            })
            .catch((err) => {
                reject({"status":"500","message":"Err"+err});
            })
        })
    }


    this.getSupplierBynic = (nic) => {

        return new Promise((resolve,reject) => {
            
            SupplierShema.find({nic : nic})
            .then((data) => {
                
                if(data.length === 1){
                    resolve({"status":"200","message":data[0].items});
                    console.log("----");
                }
                else{
                    resolve({"status":"205","message":"Can not find supplir"});
                    console.log("+++++");
                }
            })
            .catch((err) => {
                reject({"status":"500","message":"Err "+err});
            });
        })
    }


    this.getAvailableItems = () => {

        return new Promise((resolve, reject) => {

            SupplierShema.find().exec()
            .then((data) => {
                
                if(data.length !== 0 ){
                    resolve({"status":"200","message":data});
                }
                else{
                    resolve({"status":"202","message":"Can not find order"});
                }
            })
            .catch((err) => {
                reject({"status":"500","message":"Err"+err});
            })
        })
    }

    this.update = (id , Data) => {
        return new Promise((resolve,reject) => {
            SupplierShema.find().exec()
            .then((data) => {
                if(data.length === 1){
                    SupplierShema.update({ _id : id } , Data)
                    .then(() => {
                        resolve({"status":"200","message":"Update Supplier"});
                    })
                    .catch((err) => {
                        reject({"status":"500","message":"Err "+err});
                    });
                }
                else{
                    resolve({"status":"205","message":"Can not find supplier"})
                }
            })
            .catch((err) => {
                reject({"status":"404","message":"Err "+err});
            })
        })
    }


    this.updateSupplier = (id) => {
        return new Promise((resolve, reject) => {
            SupplierShema.find({_id : id}).exec()
            .then((data) => {
                if(data.length === 1){
                    SupplierShema.deleteOne()
                    .then(() => {
                        resolve({"status":"200","message":"Supplier Delete"});
                    })
                    .catch((err) => {
                        reject({"status":"500","message":"Err "+err});
                    })
                }
            })
            .catch((err) => {
                reject({"status":"500","message":"Err "+err});
            })
        })
    }


    
}

module.exports = new SupplierController();





