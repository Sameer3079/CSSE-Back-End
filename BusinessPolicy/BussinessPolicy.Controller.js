let mongoose = require('../Model/BusinessPolicy')
let businessPolicyModel = mongoose.model('BusinessPolicy')

let employeeController = function () {

    this.getAll = () => {
        return new Promise((resolve, reject) => {
            businessPolicyModel.find().then(data => {
                resolve({ status: 200, businessPolicies: data })
            }).catch(error => {
                reject({ status: 500, message: 'Internal Server Error' })
            })
        })
    }

    this.getOne = (id) => {
        return new Promise((resolve, reject) => {
            businessPolicyModel.findOne({ policyId: id }).then(data => {
                if (data !== null) {
                    resolve({ status: 200, data: data })
                } else {
                    reject({ status: 404, message: 'Business Policy not found' })
                }
            }).catch(error => {
                reject({ status: 500, message: 'Internal Server Error' })
            })
        })
    }

    this.addBusinessPolicy = (req) => {
        return new Promise((reject, resolve) => {
            businessPolicyModel.findOne({ policyId: req.body.policyId }).then(data => {
                if (data === null) {
                    let businessPolicy = new businessPolicyModel({
                        policyId: req.body.policyId,
                        description: req.body.description
                    })
                    businessPolicy.save().then(data => {
                        resolve({ status: 201, message: 'Policy has been added' })
                    }).catch(error => {
                        reject({ status: 500, message: 'Internal Server Error' })
                    })
                }
                else {
                    reject({ status: 400, message: 'Policy ID is already in use' })
                }
            }).catch(error => {
                reject({ status: 500, message: 'Internal Server Error' })
            })
        })
    }

    this.updateBusinessPolicy = (req) => {
        return new Promise((resolve, reject) => {
            businessPolicyModel.findOne({ policyId: req.body.policyId }).then(data => {
                if (data !== null) {
                    data.policyId = req.body.policyId
                    data.description = req.body.description
                    data.save().then(data => {
                        resolve({ status: 200, message: 'Policy has been updated' })
                    }).catch(error => {
                        console.log(error)
                        reject({ status: 500, message: 'Internal Server Error' })
                    })
                }
                else {
                    reject({ status: 400, message: 'Invalid Policy ID' })
                }
            }).catch(error => {
                reject({ status: 500, message: 'Error searching for policy' })
            })
        })
    }

    this.removeBusinessPolicy = (policyId) => {
        return new Promise((resolve, reject) => {
            businessPolicyModel.findOne({ policyId: policyId }).then(data => {
                if (data !== null) {
                    businessPolicyModel.deleteOne({ policyId: policyId }).then(data => {
                        resolve({ status: 200, message: 'Policy has been removed' })
                    }).catch(error => {
                        reject({ status: 500, message: 'Error removing policy' })
                    })
                } else {
                    reject({ status: 400, message: 'Policy not found' })
                }
            }).catch(error => {
                reject({ status: 500, message: 'Error occured when searching for policy' })
            })
        })
    }
}

module.exports = new employeeController()