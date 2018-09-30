const Express           = require("express");
const Route             = Express.Router();
const ItemController    = require('./Item.Controller');

    /**
     * POST 
     * create new item and it return status code as 201
     * Created By Sachith Tharaka
     * 2018/09/30
     */
Route.post('/' , (req,res) => {

    ItemController.addItem(req.body)
    .then((data) => {
        res.status(data.status).send({"message":data.message});
    })
    .catch((err) => {
        res.status(err.status).send({"message":err.message});
    });

});

module.exports = Route;