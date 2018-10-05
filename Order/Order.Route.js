const Express           = require("express");
const Router             = Express.Router();
const OrderController   = require("./Order.Controller");

    /**
     * POST 
     * If success, Return status code as 201
     * Created By Sachith Tharaka
     * 2018/09/30
     */
Router.post('/' , (req, res) => {

    OrderController.addOrder(req.body)
    .then((data) => {
        res.status(data.status).send({"message":data.message});
    })
    .catch((err) => {
        res.status(err.status).send({"message":err.message});
    });
});


    /**
     * DELETE 
     * If success, return status code as 200
     * Created By Sachith Tharaka
     * 2018/09/30
     */
Router.delete('/:id' , (req,res) => {
    OrderController.deleteOrder(req.params.id)
    .then((data) => {
        res.status(data.status).send(data.message);
    })
    .catch((err) => {
        res.status(err.status).send(err.message);
    });
})


    /**
     * GET 
     * If success, return status code 200.
     * Created By Sachith Tharaka
     * 2018/09/30
     */
Router.get('/' , (req, res)  => {
    OrderController.getAllOrders()
    .then((data) => {
        res.status(data.status).send(data.message);
    })
    .catch((err) => {
        res.status(err.status).send({"message":err.message});
    });
})


Router.put('/:id' , (req,res) => {
    console.log();
    console.log();
    OrderController.updateOrder(req.params.id , req.body)
    .then((data) => {
        res.status(data.status).send(data.message);
    })
    .catch((err) => {
        res.status(err.status).send(err.message);
    })
})

module.exports = Router;

