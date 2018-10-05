const Mongoose         = require("../Model/Payment");
const PaymentSchema    = Mongoose.model("Payment");

var PaymentController = function(){

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


}

module.exports = new PaymentController();