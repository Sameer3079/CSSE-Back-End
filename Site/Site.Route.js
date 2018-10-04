const Express           = require("express");
const Route             = Express.Router();
const SiteController    = require("./Site.Controller");

/**
 * POST 
 * create new site and it return status code as 201
 * 2018/09/30
 */
Route.post('/' , (req, res)  => {
    console.log(req.body);
    SiteController.addSite(req.body)
    .then((data) => {
        res.status(data.status).send({"message":data.message});
    })
    .catch((err) => {
        console.log(err);
        res.status(err.status).send({"message":data.message});
    });
});



    /**
     * GET 
     * Return status code as 200
     * 2018/09/30
     */
Route.get('/' , (req,res) => {
    SiteController.getAllSites()
    .then((data) => {
        res.status(data.status).send(data.message)
    })
    .catch((err) => {
        res.status(err.status).send({"message":err.message});
    });
})


    /**
     * GET. 
     * Return status code as 200 if success.
     * 2018/09/30.
     */
Route.get('/:name' , (req,res) => {
    SiteController.getItemOfSite(req.params.name)
    .then((data) => {
        res.status(data.status).send(data.message);
    })
    .catch((err) => {
        res.status(err.status).send(err.message);
    });
})

module.exports = Route;