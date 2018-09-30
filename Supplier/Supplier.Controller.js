let mongoose = require('../Model/Supplier')
let supplierModel = mongoose.model('Supplier')

let supplierController = function () {

    this.getAll = () => {
        return new Promise((resolve, reject) => {
            supplierModel.find().then(data => {
                resolve({ status: 200, data: data })
            }).catch(error => {
                reject({ status: 500, message: 'Error getting suppliers' })
            })
        })
    }

    this.getOne = (supplierId) => {
        return new Promise((resolve, reject) => {
            supplierModel.findOne({ supplierId: supplierId }).then(data => {
                if (data !== null) {
                    resolve({ status: 200, data: data })
                } else {
                    reject({ status: 404, message: 'Supplier not found' })
                }
            }).then(error => {
                reject({ status: 500, message: 'Error getting supplier' })
            })
        })
    }

    this.addSupplier = (req) => {
        return new Promise((resolve, reject) => {
            supplierModel.findOne({ supplierId: req.body.supplierId }).then(data => {
                if (data === null) {
                    let supplier = new supplierModel({
                        supplierId: req.body.supplierId,
                        name: req.body.name,
                        bankAccount: req.body.bankAccount,
                        address: req.body.address,
                        email: req.body.address,
                        contactNo: req.body.contactNo,
                        items: req.body.items,
                        available: req.body.available
                    })
                    supplier.save().then(data => {
                        resolve({ status: 201, message: 'Supplier has been added' })
                    }).catch(error => {
                        reject({ status: 500, message: error })
                    })
                }
                else {
                    reject({ status: 400, message: 'Supplier ID is already in use' })
                }
            }).catch(error => {
                reject({ status: 500, message: 'Error occured when checking whether supplier ID is already in use' })
            })
        })
    }

    this.updateSupplier = (req) => {
        return new Promise((resolve, reject) => {
            supplierModel.findOne({ supplierId: req.body.supplierId }).then(data => {
                if (data !== null) {
                    data.supplierId = req.body.supplierId
                    data.name = req.body.name
                    data.bankAccount = req.body.bankAccount
                    data.address = req.body.address
                    data.email = req.body.address
                    data.contactNo = req.body.contactNo
                    data.items = req.body.items
                    data.available = req.body.available
                    data.save().then(data => {
                        resolve({ status: 200, message: 'Supplier has been updated'})
                    }).catch(error => {
                        reject({ status: 500, message: 'Error occured when updating supplier' })
                    })
                }
                else {
                    reject({ status: 400, message: 'Invalid Supplier ID' })
                }
            }).catch(error => {
                reject({ status: 500, message: 'Error occured when searching for supplier' })
            })
        })
    }
}

module.exports = new supplierController()