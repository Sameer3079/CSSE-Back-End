const Express           = require("express");
const Router             = Express.Router();
const SupplierController   = require("./Supplier.Controller");

/**
     * POST 
     * If success, Return status code as 201
     * Created By Sahiru Galappaththi
     */

    Router.post('/' , (req, res) => {

        SupplierController.addSupplier(req.body)
        .then((data) => {
            res.status(data.status).send({"message":data.message});
        })
        .catch((err) => {
            res.status(err.status).send({"message":err.message});
        });
    });



    Router.get('/' , (req, res)  => {
        SupplierController.getAllSuppliers()
        .then((data) => {
            res.status(data.status).send(data.message);
        })
        .catch((err) => {
            res.status(err.status).send({"message":err.message});
        });
    })
