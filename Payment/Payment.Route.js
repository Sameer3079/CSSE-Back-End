const Express               = require("express");
const Route                 = Express.Router();
const PaymentController     = require("./Payment.Controller");

Route.post('/' , (req,res) => {
    PaymentController.addPayment(req.body)
    .then((data) => {
        res.status(data.status).send({message:data.message})
    })
    .catch((err) => {
        res.status(err.status).send({message:err.message})
    })
});

module.exports = Route;