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
                sequential: Data.sequential,
                items: Data.items,
                orderStatus: Data.orderStatus,
                orderDate: Data.orderDate,
                isDraftPurchaseOrder: Data.isDraftPurchaseOrder,
                onHold: Data.onHold
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
     * getting a order by its id
     */
    this.getOrderByID = (id) => {
        return new Promise((resolve, reject) => {
            OrderShema.find({ _id: id }).exec()
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
    }


}



module.exports = new OrderController();