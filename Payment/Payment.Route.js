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
Route.get('/' , (req,res) => {
    PaymentController.getAllPayments()
    .then((data) => {
        res.status(data.status).send(data.message)
    })
    .catch((err) => {
        res.status(err.status).send({"message":err.message});
    });
})
Route.get('/pending' , (req,res) => {
    PaymentController.getPendingPayments()
    .then((data) => {
        res.status(data.status).send(data.message)
    })
    .catch((err) => {
        res.status(err.status).send({"message":err.message});
    });
})
Route.get('/paid' , (req,res) => {
    PaymentController.getPaidPayments()
    .then((data) => {
        res.status(data.status).send(data.message)
    })
    .catch((err) => {
        res.status(err.status).send({"message":err.message});
    });
})
module.exports = Route;