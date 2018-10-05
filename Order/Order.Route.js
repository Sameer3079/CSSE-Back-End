const Express = require("express");
const Router = Express.Router();
const OrderController = require("./Order.Controller");

Router.post('/', (req, res) => {

    OrderController.addOrder(req.body)
        .then((data) => {
            res.status(data.status).send({ "message": data.message });
        })
        .catch((err) => {
            res.status(err.status).send({ "message": err.message });
        });
});
Router.get('/', (req, res) => {
    OrderController.getAllOrders()
        .then((data) => {
            res.status(data.status).send(data.message)
        })
        .catch((err) => {
            res.status(err.status).send({ "message": err.message });
        });
})
Router.get('/:id', (req, res) => {
    OrderController.getOrderByID(req.params.id, req.body)
      .then(data => {
        res.status(data.status).send({ message: data.message });
      })
      .catch(err => {
        res.status(err.status).send({ message: err.message });
      });
  });
module.exports = Router;

