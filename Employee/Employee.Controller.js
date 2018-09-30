let mongoose = require('../Model/Employee')
let employeeModel = mongoose.model('AuthorizedEmployee')

let employeeController = function () {

    this.getAll = () => {
        return new Promise((resolve, reject) => {
            employeeModel.find().then(data => {
                resolve({ statusCode: 200, data: data })
            }).catch((error) => {
                reject({ statusCode: 500, error: error })
            })
        })
    }
}

module.exports = new employeeController()