const Mongoose = require("../Model/Order")
const orderModel = Mongoose.model("Order")

var OrderController = function () {

    this.getAll = () => {
        return new Promise((resolve, reject) => {
            orderModel.find().then(data => {
                resolve({ status: 200, data: data })
            }).catch(error => {
                reject({ status: 500, message: error })
            })
        })
    }

    this.getOne = orderId => {
        return new Promise((resolve, reject) => {
            orderModel.findOne({ orderId: orderId }).then(data => {
                if (data !== null) {
                    resolve({ status: 200, data: data })
                } else {
                    reject({ status: 404, message: 'Order not found' })
                }
            }).catch(error => {
                reject({ status: 500, message: error })
            })
        })
    }

    this.addOrder = (req) => {
        return new Promise((resolve, reject) => {
            orderModel.findOne({ orderId: req.body.orderId }).then(data => {
                if (data === null) {
                    let order = new orderModel({
                        orderId: req.body.orderId,
                        itemName: req.body.itemName,
                        requestId: req.body.requestId,
                        quantity: req.body.quantity,
                        unitPrice: req.body.unitPrice,
                        orderDate: req.body.orderDate,
                        paid: false
                    })
                    order.save().then(data => {
                        resolve({ status: 201, message: 'Order has been created' })
                    }).catch(error => {
                        reject({ status: 400, message: error })
                    })
                } else {
                    reject({ status: 400, message: 'Order ID is already in use' })
                }
            }).catch(error => {
                reject({ status: 500, message: error })
            })
        })
    }

    this.deleteOrder = (id) => {

        return new Promise((resolve, reject) => {

            orderModel.find({ _id: id }).exec()
                .then((data) => {
                    if (data.length === 1) {
                        console.log("IF")
                        orderModel.deleteOne({ _id: id })
                            .then(() => {
                                resolve({ "status": "200", "message": "Order is deleted" })
                            })
                            .catch((err) => {
                                reject({ "status": "500", "message": "Err " + err })
                            })
                    }
                    else {
                        resolve({ "status": "205", "message": "Can not find order" })
                    }
                })
                .catch((err) => {
                    reject({ "status": "500", "message": "Err " + err })
                })
        })
    }

    this.updateOrder = (orderId, Data) => {
        return new Promise((resolve, reject) => {
            orderModel.findOne({ orderId: orderId }).then(data => {
                if (data !== null) {
                    data.itemName = Data.itemName
                    data.requestId = Data.requestId
                    data.quantity = Data.quantity
                    data.unitPrice = Data.unitPrice
                    data.orderDate = Data.orderDate
                    data.paid = Data.paid
                    data.save().then(data => {
                        resolve({ status: 200, message: 'Order has been updated' })
                    }).catch(error => {
                        reject({ status: 500, message: 'Error Occured when updating' })
                    })
                }
                else {
                    resolve({ status: 205, message: "Can not find order" })
                }
            }).catch(error => {
                reject({ status: 404, message: error })
            })
        })
    }

    this.getOrderBySupplier = (supplierName) => {

        return new Promise((resolve, reject) => {
            orderModel.find({ supplierName: supplierName })
                .then((data) => {

                    if (data.length === 1) {
                        resolve({ "status": "200", "message": data })
                    }
                    else {
                        resolve({ "status": "205", "message": "Can not find order" })
                    }
                })
                .catch((err) => {
                    reject({ "status": "500", "message": "Err " + err })
                })
        })
    }

}

module.exports = new OrderController()