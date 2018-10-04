let mongoose = require('../Model/Site')
let siteModel = mongoose.model('Site')

let siteController = function () {

    this.getAll = () => {
        return new Promise((resolve, reject) => {
            siteModel.find().then(data => {
                resolve({ status: 200, sites: data })
            }).catch(error => {
                reject({ status: 500, message: 'Internal Server Error '+ error })
            })
        })
    }

    this.getOne = (id) => {
        return new Promise((resolve, reject) => {
            siteModel.findOne({ siteId: id }).then(data => {
                if (data !== null) {
                    resolve({ status: 200, data: data })
                } else {
                    reject({ status: 404, message: 'Site is not found' })
                }
            }).catch(error => {
                reject({ status: 500, message: 'Internal Server  ' + error })
            })
        })
    }

    this.addSite = (req) => {
        return new Promise((reject, resolve) => {
                siteModel.findOne({ siteId: reqBody.siteId }).then(data => {
                    if (data === null) {
                        let site = new siteModel({
                            siteId: reqBody.siteId,
                            name: reqBody.name,
                            address: reqBody.address,
                            items: data.items,
                            storageCapacity: reqBody.storageCapacity,
                            currentCapacity: reqBody.currentCapacity,
                            siteManager: reqBody.siteManager 
                        })
                        site.save().then(data => {
                            resolve({ status: 201, message: 'Site has been added' })
                        }).catch(error => {
                            reject({ status: 500, message: 'Internal Server Error ' + error })
                        })
                    }
                    else {
                        reject({ status: 400, message: 'site ID is already in use' })
                    }
                }).catch(error => {
                    reject({ status: 500, message: 'Internal Server Error' })
                })
        })
        
    }

    this.updateSite = (req) => {
        return new Promise((resolve, reject) => {
            siteModel.findOne({ siteId: req.body.siteId }).then(data => {
                if (data !== null) {
                    data.siteId = req.body.siteId
                    data.name = req.body.name
                    data.address = req.body.address
                    data.items = [reqBody.items.name, reqBody.items.quantity ]
                    data.storageCapacity = req.body.storageCapacity
                    data.currentCapacity = req.body.currentCapacity
                    data.siteManager = req.body.siteManager 
                    data.save().then(data => {
                        resolve({ status: 200, message: 'Site has been updated' })
                    }).catch(error => {
                        console.log(error)
                        reject({ status: 500, message: 'Internal Server Error ' +error })
                    })
                }
                else {
                    reject({ status: 400, message: 'Invalid Site ID' })
                }
            }).catch(error => {
                reject({ status: 500, message: 'Error searching for Site' })
            })
        })
    }

    this.removeSite = (siteId) => {
        return new Promise((resolve, reject) => {
            siteModel.findOne({ siteId: siteId }).then(data => {
                if (data !== null) {
                    siteModel.deleteOne({ siteId: siteId }).then(data => {
                        resolve({ status: 200, message: 'Site has been removed' })
                    }).catch(error => {
                        reject({ status: 500, message: 'Error removing site' })
                    })
                } else {
                    reject({ status: 400, message: 'site not found' })
                }
            }).catch(error => {
                reject({ status: 500, message: 'Error occured when searching for site' })
            })
        })
    }
}

module.exports = new siteController()