const mongoose = require('mongoose')
const schema = mongoose.Schema

let authorizedEmployee = new schema({
    id: String,
    type: String,
    firstName: String,
    lastName: String,
    address: String,
    email: String,
    phone: String
})

let supplier = new schema({
    id: String,
    name: String,
    bankAcc: String,
    address: String,
    email: String,
    phone: String,
    items: [{ id: String, name: String, price: Number}]
})

let siteManager = new schema({
    id: String,
    type: String,
    firstName: String,
    lastName: String,
    address: String,
    email: String,
    phone: String,
    managedSiteId: Number
})

mongoose.model('AuthorizedEmployee', authorizedEmployee)
mongoose.model('Supplier', supplier)
mongoose.model('SiteManager', siteManager)

module.exports = mongoose