const Express           = require("express");
const Route             = Express.Router();
const ItemController    = require('./Item.Controller');


Route.post('/' , (req,res) => {

    ItemController.addItem(req.body)
    .then((data) => {
        res.status(data.status).send({"message":data.message});
    })
    .catch((err) => {
        res.status(err.status).send({"message":err.message});
    });

});

Route.get('/' , (req,res) => {
    ItemController.getAllItem()
    .then((data) => {
        res.status(data.status).send(data.message)
    })
    .catch((err) => {
        res.status(err.status).send({"message":err.message});
    });
})

module.exports = Route;