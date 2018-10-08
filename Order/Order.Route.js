const Express = require("express")
const Router = Express.Router()
const OrderController = require("./Order.Controller")

Router.get('/', (req, res) => {
    OrderController.getAll().then((data) => {
        res.status(data.status).send(data.data)
    }).catch((err) => {
        res.status(err.status).send({ message: err.message })
    })
})

Router.get('/:orderId', (req, res) => {
    OrderController.getOne(req.params.orderId).then(data => {
        res.status(data.status).send(data.data)
    }).catch(error => {
        res.status(error.status).send({ message: error.message })
    })
})

Router.post('/', (req, res) => {
    OrderController.addOrder(req).then(data => {
        res.status(data.status).send(data.data)
    }).catch(error => {
        res.status(error.status).send({ message: error.message })
    })
})

Router.delete('/:id', (req, res) => {
    OrderController.deleteOrder(req.params.id).then((data) => {
        res.status(data.status).send(data.message)
    }).catch((err) => {
        res.status(err.status).send(err.message)
    })
})

Router.put('/:orderId', (req, res) => {
    OrderController.updateOrder(req.params.orderId, req.body).then(data => {
        res.status(data.status).send({ message: data.message })
    }).catch(error => {
        res.status(error.status).send({ message: error.message })
    })
})

module.exports = Router