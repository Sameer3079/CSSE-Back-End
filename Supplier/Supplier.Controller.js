let mongoose = require('../Model/Supplier')
let supplierModel = mongoose.model('Supplier')
let regex = require('../Utilities/Regex')
let emailRegEx = regex.emailRegEx
let textOnlyRegEx = regex.textOnlyRegEx
let contactNoRegEx = regex.contactNoRegEx
let numbersOnlyRegEx = regex.numbersOnlyRegEx

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
            if (!(emailRegEx.test(req.body.email) && textOnlyRegEx.test(req.body.name)
                && numbersOnlyRegEx.test(req.body.bankAccount))) {
                reject({ status: 400, message: 'Invalid supplier details\nRecheck the values' })
            } else if (!contactNoRegEx.test(req.body.contactNo)) {
                reject({ status: 400, message: 'Invalid contact number' })
            } else if (req.body.items.constructor !== Array) {
                reject({ status: 400, message: 'Invalid items' })
            } else if (req.body.available.constructor !== Boolean) {
                reject({ status: 400, message: 'Invalid available value' })
            } else if (req.body.blacklisted.constructor !== Boolean) {
                reject({ status: 400, message: 'Invalid blacklisted value' })
            }
            else {
                supplierModel.findOne({ supplierId: req.body.supplierId }).then(data => {
                    if (data === null) {
                        let supplier = new supplierModel({
                            supplierId: req.body.supplierId,
                            name: req.body.name,
                            bankAccount: req.body.bankAccount,
                            address: req.body.address,
                            email: req.body.email,
                            contactNo: req.body.contactNo,
                            items: req.body.items,
                            available: req.body.available,
                            blacklisted: req.body.blacklisted
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
            }
        })
    }

    this.updateSupplier = (req) => {
        return new Promise((resolve, reject) => {
            if (!(emailRegEx.test(req.body.email) && textOnlyRegEx.test(req.body.name)
                && numbersOnlyRegEx.test(req.body.bankAccount))) {
                reject({ status: 400, message: 'Invalid supplier details\nRecheck the values' })
            } else if (!contactNoRegEx.test(req.body.contactNo)) {
                reject({ status: 400, message: 'Invalid contact number' })
            } else if (req.body.items.constructor !== Array) {
                reject({ status: 400, message: 'Invalid items' })
            } else if (req.body.available.constructor !== Boolean) {
                reject({ status: 400, message: 'Invalid available value' })
            } else if (req.body.blacklisted.constructor !== Boolean) {
                reject({ status: 400, message: 'Invalid blacklisted value' })
            }
            else {
                supplierModel.findOne({ supplierId: req.body.supplierId }).then(data => {
                    if (data !== null) {
                        data.supplierId = req.body.supplierId
                        data.name = req.body.name
                        data.bankAccount = req.body.bankAccount
                        data.address = req.body.address
                        data.email = req.body.email
                        data.contactNo = req.body.contactNo
                        data.items = req.body.items
                        data.available = req.body.available
                        data.blacklisted = req.body.blacklisted
                        data.save().then(data => {
                            resolve({ status: 200, message: 'Supplier has been updated', updatedSupplier: data })
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
            }
        })
    }

    this.removeSupplier = (supplierId) => {
        return new Promise((resolve, reject) => {
            supplierModel.findOne({ supplierId: supplierId }).then(data => {
                if (data !== null) {
                    supplierModel.deleteOne({ supplierId: supplierId }).then(data => {
                        resolve({ status: 200, message: 'Supplier has been removed' })
                    }).catch(error => {
                        reject({ status: 500, message: 'Error occured when removing supplier' })
                    })
                } else {
                    reject({ status: 400, message: 'Supplier does not exist' })
                }
            }).catch(error => {
                reject({ status: 500, message: 'Error occured when searching for supplier' })
            })
        })
    }
}

module.exports = new supplierController()