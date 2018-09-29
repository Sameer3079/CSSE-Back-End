const Express           = require("express");
const Route             = Express.Router();
const UserController    = require("./User.Controller");

Route.post('/' , (req,res) => {

    UserController.addUser(req.body)
    .then((data) => {
        res.status(data.status).send({"message":data.message});
    })
    .catch((err) => {
        res.status(err.status).send({"message":err.message});
    });
});

module.exports = Route;