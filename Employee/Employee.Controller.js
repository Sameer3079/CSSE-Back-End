let mongoose = require('../Model/Employee')
let employeeModel = mongoose.model('Employee')

let employeeController = function () {

    this.getAll = () => {
        return new Promise((resolve, reject) => {
            employeeModel.find().then(data => {
                resolve({ status: 200, employees: data })
            }).catch(error => {
                reject({ status: 500, message: 'Internal Server Error' })
            })
        })
    }

    this.getOne = (id) => {
        return new Promise((resolve, reject) => {
            employeeModel.findOne({ empId: id }).then(data => {
                if (data !== null) {
                    resolve({ status: 200, data: data })
                } else {
                    reject({ status: 404, message: 'Employee not found' })
                }
            }).catch(error => {
                reject({ status: 500, message: 'Internal Server Error' })
            })
        })
    }

    this.addEmployee = (req) => {
        return new Promise((reject, resolve) => {
            let reqBody = req.body
            if (reqBody.type !== 'Authorized Employee' && reqBody.type !== 'Site Manager'
                && reqBody.type !== 'Senior Member of Staff' && reqBody.type !== 'Management') {
                reject({ status: 400, message: 'Employee Type is NOT Valid\nIt can only be one of the following: Authorized Employee, Site Manager, Senior Member of Staff, or Management' })
            } else {
                employeeModel.findOne({ empId: reqBody.empId }).then(data => {
                    if (data === null) {
                        let employee = new employeeModel({
                            empId: reqBody.empId,
                            type: reqBody.type,
                            firstName: reqBody.firstName,
                            lastName: reqBody.lastName,
                            address: reqBody.address,
                            email: reqBody.email,
                            contactNo: reqBody.contactNo,
                            managedSiteId: reqBody.managedSiteId,
                            role: reqBody.role
                        })
                        employee.save().then(data => {
                            resolve({ status: 201, message: 'Employee has been added' })
                        }).catch(error => {
                            reject({ status: 400, message: error })
                        })
                    }
                    else {
                        reject({ status: 400, message: 'Employee ID is already in use' })
                    }
                }).catch(error => {
                    reject({ status: 500, message: 'Internal Server Error' })
                })
            }
        })
    }

    this.updateEmployee = (req) => {
        return new Promise((resolve, reject) => {
            employeeModel.findOne({ empId: req.body.empId }).then(data => {
                if (data !== null) {
                    data.empId = req.body.empId
                    data.type = req.body.type
                    data.firstName = req.body.firstName
                    data.lastName = req.body.lastName
                    data.address = req.body.address
                    data.email = req.body.email
                    data.contactNo = req.body.contactNo
                    data.managedSiteId = req.body.managedSiteId
                    data.role = req.body.role
                    data.save().then(data => {
                        resolve({ status: 200, message: 'Employee has been updated', updatedEmployee: data })
                    }).catch(error => {
                        console.log(error)
                        reject({ status: 500, message: 'Internal Server Error' })
                    })
                }
                else {
                    reject({ status: 400, message: 'Invalid Employee ID' })
                }
            }).catch(error => {
                reject({ status: 500, message: 'Error searching for employee' })
            })
        })
    }

    this.removeEmployee = (empId) => {
        return new Promise((resolve, reject) => {
            employeeModel.findOne({ empId: empId }).then(data => {
                if (data !== null) {
                    employeeModel.deleteOne({ empId: empId }).then(data => {
                        resolve({ status: 200, message: 'Employee has been removed' })
                    }).catch(error => {
                        reject({ status: 500, message: 'Error removing employee' })
                    })
                } else {
                    reject({ status: 400, message: 'Employee not found' })
                }
            }).catch(error => {
                reject({ status: 500, message: 'Error occured when searching for employee' })
            })
        })
    }
}

module.exports = new employeeController()