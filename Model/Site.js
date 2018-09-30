let mongoose = require('mongoose')
let schema = mongoose.Schema

//create nested item schema
let itemSchema = new schema ({
    name: { required: true, type: String },
    quantity : {required: true, type: number}
})

let siteSchema = new schema({
    siteId: { required: true, type: String },
    name: { required: true, type: String },
    address: { required: true, type: String },
    items: [itemSchema],                                // create array of items
    storageCapacity : {required: true, type: number},
    currentCapacity : {required: true, type: number},
    siteManager :  { required: false, type: String }

})

mongoose.model('Site', siteSchema, 'sites')

module.exports = mongoose
 
 