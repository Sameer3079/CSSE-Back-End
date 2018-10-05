let express = require('express')
let router = express.Router()
let employeeController = require('./Employee.Controller')

router.get('/', (req, res) => {
    employeeController.getAll().then(data => {
        res.status(data.status).send(data.employees)
    }).catch(error => {
        res.status(error.status).send({ message: error.message })
    })
})

router.get('/:id', (req, res) => {
    employeeController.getOne(req.params.id).then(data => {
        res.status(data.status).send(data.data)
    }).catch(error => {
        res.status(error.status).send({ message: error.message })
    })
})

router.post('/', (req, res) => {
    employeeController.addEmployee(req).then(data => {
        res.status(data.status).send({ message: data.message })
    }).catch(error => {
        res.status(error.status).send({ message: error.message })
    })
})

router.put('/', (req, res) => {
    employeeController.updateEmployee(req).then(data => {
        res.status(data.status).send({ message: data.message, updatedEmployee: data.updatedEmployee })
    }).catch(error => {
        res.status(error.status).send({ message: error.message })
    })
})

router.delete('/:id', (req, res) => {
    employeeController.removeEmployee(req.params.id).then(data => {
        res.status(data.status).send({ message: data.message })
    }).catch(error => {
        res.status(error.status).send({ message: error.message })
    })
})

module.exports = router