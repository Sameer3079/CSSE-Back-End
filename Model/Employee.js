const mongoose = require('mongoose')
const schema = mongoose.Schema

let employee = new schema({
    empId: { required: true, type: String },
    type: { required: true, type: String }, // Authorized Employee/Site Manager/Senior Member of Staff/Management
    firstName: { required: true, type: String },
    lastName: { required: true, type: String },
    address: { required: true, type: String },
    email: { required: true, type: String },
    contactNo: { required: true, type: String },
    managedSiteId: { required: false, type: String }, // Site Manager
    role: { required: false, type: String } // Senior Member of Staff
})

mongoose.model('Employee', employee, 'employees')

module.exports = mongoose