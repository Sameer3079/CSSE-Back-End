let express = require('express')
let router = express.Router()
let supplierController = require('./Supplier.Controller')

router.get('/', (req, res) => {
    supplierController.getAll().then(data => {
        res.status(data.status).send(data.data)
    }).catch(error => {
        res.status(error.status).send({ message: error.message })
    })
})

router.get('/:id', (req, res) => {
    supplierController.getOne(req.params.id).then(data => {
        res.status(data.status).send(data.data)
    }).catch(error => {
        res.status(error.status).send({ message: error.message })
    })
})

router.post('/', (req, res) => {
    supplierController.addSupplier(req).then(data => {
        res.status(data.status).send({ message: data.message })
    }).catch(error => {
        res.status(error.status).send({ message: error.message })
    })
})

router.put('/', (req, res) => {
    supplierController.updateSupplier(req).then(data => {
        res.status(data.status).send({ message: data.message })
    }).catch(error => {
        res.status(error.status).send({ message: error.message })
    })
})

module.exports = router