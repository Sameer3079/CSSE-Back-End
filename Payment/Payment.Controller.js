const Mongoose         = require("../Model/Payment");
const PaymentSchema    = Mongoose.model("Payment");

var PaymentController = function(){

    this.addPayment = (Data) => {
        return new Promise((resolve,reject) => {
            var payment = new PaymentSchema({
                orderId : Data.orderId,
                supplierName : Data.supplierName,
                bankAccountNumber : Data.bankAccountNumber,
                amount : Data.amount
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

}

module.exports = new PaymentController();