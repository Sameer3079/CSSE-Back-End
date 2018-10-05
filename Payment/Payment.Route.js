const Express               = require("express");
const Route                 = Express.Router();
const PaymentController     = require("./Payment.Controller");
 /**
     * 
     * adding new payment data
     */
Route.post('/' , (req,res) => {
    PaymentController.addPayment(req.body)
    .then((data) => {
        res.status(data.status).send({message:data.message})
    })
    .catch((err) => {
        res.status(err.status).send({message:err.message})
    })
});
   /**
     * 
     * getting all payments
     */
Route.get('/' , (req,res) => {
    PaymentController.getAllPayments()
    .then((data) => {
        res.status(data.status).send(data.message)
    })
    .catch((err) => {
        res.status(err.status).send({"message":err.message});
    });
})
 
 /**
     * 
     * getting pending payments
     */
Route.get('/pending' , (req,res) => {
    PaymentController.getPendingPayments()
    .then((data) => {
        res.status(data.status).send(data.message)
    })
    .catch((err) => {
        res.status(err.status).send({"message":err.message});
    });
})
/**
     * 
     * getting only paid payments
     */
Route.get('/paid' , (req,res) => {
    PaymentController.getPaidPayments()
    .then((data) => {
        res.status(data.status).send(data.message)
    })
    .catch((err) => {
        res.status(err.status).send({"message":err.message});
    });
})
 /**
     * 
     * making the payment by updating the status true
     */
Route.put('/:id', (req, res) => {
    PaymentController.makePayment(req.params.id)
    .then((data) => {
        res.status(data.status).send({message:data.message});
    })
    .catch((err) => {
        res.status(err.status).send({message:err.message});
    });
})

module.exports = Route;