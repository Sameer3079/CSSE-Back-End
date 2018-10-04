const Mongoose          = require("../Model/Supplier");
const SupplierShema        = Mongoose.model("Supplier");

var OrderController = function(){


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
                availability : Data.availability
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



    this. getSupplierBynic = (nic) => {

        return new Promise((resolve,reject) => {
            SupplierShema.find({nic : nic})
            .then((data) => {
                
                if(data.length === 1){
                    resolve({"status":"200","message":data});
                }
                else{
                    resolve({"status":"205","message":"Can not find supplir"})
                }
            })
            .catch((err) => {
                reject({"status":"500","message":"Err "+err});
            });
        })
    }




}







































