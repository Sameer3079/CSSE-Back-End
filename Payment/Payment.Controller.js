const Mongoose         = require("../Model/Payment");
const PaymentSchema    = Mongoose.model("Payment");

var PaymentController = function(){

    /**
     * 
     * adding new payment data
     */

    this.addPayment = (Data) => {
        return new Promise((resolve,reject) => {
            var payment = new PaymentSchema({
                orderId:Data.orderId,
                supplierName : Data.supplierName,
                date:Data.date,
                bankAccountNumber : Data.bankAccountNumber,
                amount : Data.amount,
                status:Data.status
            });

            payment.save()
            .then(() => {
                resolve({"status":201 , "message":"Payment Done"})
            })
            .catch((err) => {
                reject({"status":404 , "message":"Err "+err});
            });

        })
    }

    /**
     * 
     * getting all payments
     */


    this.getAllPayments = () => {
        return new Promise((resolve,reject) => {
            PaymentSchema.find().exec()
            .then((data) => {
                if(data.length !== 0){
                    resolve({"status":"200","message":data});
                }
                else{
                    reject({"status":"204","message":"No Content"});
                }
            })
            .catch((err) => {
                reject({"status":"500","message":"Err "+err});
            });
        })
    }

    /**
     * 
     * getting only paid payments
     */

    this.getPaidPayments = () => {
        return new Promise((resolve,reject) => {
            PaymentSchema.find({status:{$eq:true}}).exec()
            .then((data) => {
                if(data.length !== 0){
                    resolve({"status":"200","message":data});
                }
                else{
                    reject({"status":"204","message":"No Content"});
                }
            })
            .catch((err) => {
                reject({"status":"500","message":"Err "+err});
            });
        })
    }

    /**
     * 
     * getting pending payments
     */

    this.getPendingPayments = () => {
        return new Promise((resolve,reject) => {
            PaymentSchema.find({status:{$eq:false}}).exec()
            .then((data) => {
                if(data.length !== 0){
                    resolve({"status":"200","message":data});
                }
                else{
                    reject({"status":"204","message":"No Content"});
                }
            })
            .catch((err) => {
                reject({"status":"500","message":"Err "+err});
            });
        })
    }   
    /**
     * 
     * making the payment by updating the status true
     */

    this.makePayment = (id) => {
        return new Promise((resolve, reject) => {
            BookSchema.update({_id:id}, {$set: {status: true}})
            .then(() => {
                resolve({status:200 , message:"Payment made"});
            })
            .catch((err) => {
                reject({status:500 , message:err});
            });
        })
    }


}

module.exports = new PaymentController();