const Mongoose          = require("../Model/Supplier");
const SupplierSchema        = Mongoose.model("Supplier");

var SupplierController = function(){


    this.addSupplier = (Data) => {
        
        return new Promise((resolve,reject) => {
            var newSupplier = new SupplierSchema({
                supplierName : Data.supplierName,
                bankAccount : Data.bankAccount,
                nic : Data.nic,
                address : Data.address,
                email : Data.email,
                phone : Data.phone,
                items : Data.items,
                blackList :true
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

            SupplierSchema.find().exec()
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






    // this.getAvailableItems = () => {

    //     return new Promise((resolve, reject) => {

    //         SupplierSchema.find().exec()
    //         .then((data) => {
                
    //             if(data.length !== 0 ){
    //                 resolve({"status":"200","message":data});
    //             }
    //             else{
    //                 resolve({"status":"202","message":"Can not find order"});
    //             }
    //         })
    //         .catch((err) => {
    //             reject({"status":"500","message":"Err"+err});
    //         })
    //     })
    // }

    this.update = (id , Data) => {
        return new Promise((resolve,reject) => {
            SupplierSchema.find().exec()
            .then((data) => {
                if(data.length === 1){
                    SupplierSchema.update({ _id : id } , Data)
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
            SupplierSchema.find({_id : id}).exec()
            .then((data) => {
                if(data.length === 1){
                    SupplierSchema.deleteOne()
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





