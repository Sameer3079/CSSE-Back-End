const mongoose = require('mongoose')
const schema = mongoose.Schema

let bussinessPolicy = new schema({
    policyId: { required: true, type: String },
    description: { required: true, type: String }
})

mongoose.model('BusinessPolicy', bussinessPolicy, 'bussinessPolicies')

module.exports = mongoose