let express = require('express')
let router = express.Router()
let employeeController = require('./Employee.Controller')

router.get('/', (req, res) => {
    employeeController.getAll().then((resolve) => {
        res.status(resolve.statusCode).send(resolve.data)
    })
})

module.exports = router