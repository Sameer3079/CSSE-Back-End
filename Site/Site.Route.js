let express = require('express')
let router = express.Router()
let siteController = require('./Site.Controller')

router.get('/', (req, res) => {
    siteController.getAll().then(data => {
        res.status(data.status).send(data.sites)
    }).catch(error => {
        res.status(error.status).send({ message: error.message })
    })
})

router.get('/:id', (req, res) => {
    siteController.getOne(req.params.id).then(data => {
        res.status(data.status).send(data.data)
    }).catch(error => {
        res.status(error.status).send({ message: error.message })
    })
})

router.post('/', (req, res) => {
    siteController.addSite(req).then(data => {
        res.status(data.status).send({ message: data.message })
    }).catch(error => {
        res.status(error.status).send({ message: error.message })
    })
})

router.put('/', (req, res) => {
    siteController.updateSite(req).then(data => {
        res.status(data.status).send({ message: data.message })
    }).catch(error => {
        res.status(error.status).send({ message: error.message })
    })
})

router.delete('/:id', (req, res) => {
    siteController.removeSite(req.params.id).then(data => {
        res.status(data.status).send({ message: data.message })
    }).catch(error => {
        res.status(error.status).send({ message: error.message })
    })
})

module.exports = router