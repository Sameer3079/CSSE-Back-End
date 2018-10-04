let mongoose = require('mongoose')
let schema = mongoose.Schema

let siteSchema = new schema({
    siteId: { required: true, type: String },
    name: { required: true, type: String },
    address: { required: true, type: String },
    items: { required: true, type: Array },                          
    storageCapacity : {required: true, type: number},
    currentCapacity : {required: true, type: number},
    siteManager :  { required: false, type: String } 
})

mongoose.model('Site', siteSchema, 'sites')

module.exports = mongoose
 
 