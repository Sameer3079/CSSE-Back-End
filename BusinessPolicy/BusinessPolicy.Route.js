let express = require('express')
let router = express.Router()
let businessPolicyController = require('./BussinessPolicy.Controller')

router.get('/', (req, res) => {
    businessPolicyController.getAll().then(data => {
        res.status(data.status).send(data.businessPolicies)
    }).catch(error => {
        res.status(error.status).send({ message: error.message })
    })
})

router.get('/:id', (req, res) => {
    businessPolicyController.getOne(req.params.id).then(data => {
        res.status(data.status).send(data.data)
    }).catch(error => {
        res.status(error.status).send({ message: error.message })
    })
})

router.post('/', (req, res) => {
    businessPolicyController.addBusinessPolicy(req).then(data => {
        res.status(data.status).send({ message: data.message })
    }).catch(error => {
        res.status(error.status).send({ message: error.message })
    })
})

router.put('/', (req, res) => {
    businessPolicyController.updateBusinessPolicy(req).then(data => {
        res.status(data.status).send({ message: data.message, updatedBusinessPolicy: data.updatedBusinessPolicy })
    }).catch(error => {
        res.status(error.status).send({ message: error.message })
    })
})

router.delete('/:id', (req, res) => {
    businessPolicyController.removeBusinessPolicy(req.params.id).then(data => {
        res.status(data.status).send({ message: data.message })
    }).catch(error => {
        res.status(error.status).send({ message: error.message })
    })
})

module.exports = router