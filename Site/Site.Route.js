const Express           = require("express");
const Route             = Express.Router();
const SiteController    = require("./Site.Controller");

/**
 * POST 
 * create new site and it return status code as 201
 * Created By Sachith Tharaka
 * 2018/09/30
 */
Route.post('/' , (req, res)  => {

    SiteController.addSite(req.body)
    .then((data) => {
        res.status(data.status).send({"message":data.message});
    })
    .catch((err) => {
        res.status(err.status).send({"message":data.message});
    });
});

Route.get('/' , (req,res) => {
    SiteController.getAllSites()
    .then((data) => {
        res.status(data.status).send(data.message)
    })
    .catch((err) => {
        res.status(err.status).send({"message":err.message});
    });
})

module.exports = Route;