const Express = require("express");
const Router = Express.Router();
const OrderController = require("./Order.Controller");

Router.post('/', (req, res) => {

    /**
     * 
     * making new order
     */

    OrderController.addOrder(req.body)
        .then((data) => {
            res.status(data.status).send({ "message": data.message });
        })
        .catch((err) => {
            res.status(err.status).send({ "message": err.message });
        });
});
/**
 * 
 *getting all orders
 */
Router.get('/', (req, res) => {
    OrderController.getAllOrders()
        .then((data) => {
            res.status(data.status).send(data.message)
        })
        .catch((err) => {
            res.status(err.status).send({ "message": err.message });
        });
})

/**
 * 
 * getting order by id
 */
// Router.get('/:id', (req, res) => {
//     OrderController.getOrderByID(req.params.id, req.body)
//         .then(data => {
//             res.status(data.status).send({ message: data.message });
//         })
//         .catch(err => {
//             res.status(err.status).send({ message: err.message });
//         });
// });

/**
    * 
    * getting unpaid orders
    */
Router.get('/pending', (req, res) => {
    OrderController.getPendingOrders()
        .then((data) => {
            res.status(data.status).send(data.message)
        })
        .catch((err) => {
            res.status(err.status).send({ "message": err.message });
        });
})

/**
 * 
 * making the payment by updating the status true
 */
Router.put('/:id', (req, res) => {
    OrderController.updateOrder(req.params.id)
        .then((data) => {
            res.status(data.status).send({ message: data.message });
        })
        .catch((err) => {
            res.status(err.status).send({ message: err.message });
        });
})
module.exports = Router;

