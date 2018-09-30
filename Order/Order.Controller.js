const Mongoose          = require("../Model/Order");
const OrderShema        = Mongoose.model("Order");

var OrderController = function(){

    this.addOrder = (Data) => {
        
        return new Promise((resolve,reject) => {
            var newOrder = new OrderShema({
                sequential : Data.sequential,
                items : Data.items,
                orderStatus : Data.orderStatus,
                orderDate : Data.orderDate,
                isDraftPurchaseOrder : Data.isDraftPurchaseOrder,
                onHold : Data.onHold
            });

            newOrder.save()
            .then(() => {
                resolve({"status":"200","message":"Order is created"});
            })
            .catch((err) => {
                reject({"status":"500","message":"Err "+err});
            });
        })
    }
}

module.exports = new OrderController();