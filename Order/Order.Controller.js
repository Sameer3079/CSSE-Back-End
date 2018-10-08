const Mongoose = require("../Model/Order");
const OrderShema = Mongoose.model("Order");

var OrderController = function () {

    /**
     * 
     * Making a new order
     */

    this.addOrder = (Data) => {

        return new Promise((resolve, reject) => {
            var newOrder = new OrderShema({
                orderID: Data.orderID,
                itemName: Data.itemName,
                requestId: Data.requestId,
                quantity: Data.quantity,
                unitPrice: Data.unitPrice,
                orderDate: Data.orderDate,
                paid:false
            });

            newOrder.save()
                .then(() => {
                    resolve({ "status": "200", "message": "Order is created" });
                })
                .catch((err) => {
                    reject({ "status": "500", "message": "Err " + err });
                });
        })
    }

    /**
     * 
     * getting all orders
     */
    this.getAllOrders = () => {
        return new Promise((resolve, reject) => {
            OrderShema.find().exec()
                .then((data) => {
                    if (data.length !== 0) {
                        resolve({ "status": "200", "message": data });
                    }
                    else {
                        reject({ "status": "204", "message": "No Content" });
                    }
                })
                .catch((err) => {
                    reject({ "status": "500", "message": "Err " + err });
                });
        })
    }


    /**
     * 
     * getting a order by orderID
     
    this.getOrderByID = (id) => {
        return new Promise((resolve, reject) => {
            OrderShema.find({ orderID: id }).exec()
                .then((data) => {
                    if (data.length === 1) {

                        resolve({ "status": "200", "message": data });
                    } else {

                        resolve({ status: 200, message: "order doesn't exist" });
                    }
                })
                .catch((err) => {
                    reject({ status: 500, message: err })
                })
        })
    }*/
/**
     * 
     * getting pending payments
     */

    this.getPendingOrders = () => {
        return new Promise((resolve,reject) => {
            OrderShema.find({paid:{$eq:false}}).exec()
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
     * making the payment by updating the paid true
     */

    this.updateOrder = (id) => {
        return new Promise((resolve, reject) => {
            OrderShema.update({orderID:id}, {$set: {paid: true}})
            .then(() => {
                resolve({status:200 , message:"Payment made"});
            })
            .catch((err) => {
                reject({status:500 , message:err});
            });
        })
    }

}



module.exports = new OrderController();