const Express                   = require("express");
const Route                     = Express.Router();
const RequestController         = require("./Request.Contoller");

    /**
     * POST 
     * If success, Return status code as 201
     * Created By Sachith Tharaka
     * 2018/09/30
     */

Route.post('/' , (req,res) => {

    RequestController.createRequest(req.body)
    .then((data) => {
        res.status(data.status).send({"message":data.message});
    })
    .catch((err) => {
        res.status(err.status).send({"message":err.message});
    });

})


Route.get('/' , (req,res) => {
    RequestController.getRequest()
    .then((data) => {
        res.status(data.status).send(data.message);
    })
    .catch((err) => {
        res.status(err.status).send({"message":err.message});
    })
}) 


module.exports = Route;