process.env.NODE_ENV = 'test'

let mongoose = require('../Model/Supplier')
let SupplierModel = mongoose.model('Supplier')
let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()
chai.use(chaiHttp);

describe('Suppliers', () => {
    let server;
    let supplier = {
        supplierId: 'SP001',
        name: 'Sameer Basil',
        bankAccount: '00005848451231',
        address: 'Boralasgamuwa',
        email: 'smrbasil4@gmail.com',
        contactNo: '0716650678',
        items: ['ihjkb456hj4k560', 'jh435kjh345bk45b'],
        available: true,
        blacklisted: false
    }
    let updatedSupplier = {
        supplierId: 'SP001',
        name: 'Sameer Hilmy',
        bankAccount: '00005848451231',
        address: 'Boralasgamuwa',
        email: 'smrbasil4@gmail.com',
        contactNo: '0716650678',
        items: ['ihjkb456hj4k560', 'jh435kjh345bk45b'],
        available: true,
        blacklisted: false
    }
    let invalidSupplier
    let invalidSupplierId = 'SP001123'
    let invalidName = '43j6hhh5jkl34h56lk34h5'
    let invalidBankAccount = 'lkh456kj345634mn6l4kj'
    let invalidEmail = 'kjl56hk3456kl4jh3j6'
    let invalidContactNo = 'jk34l56kl354bWFGA9GH87'
    let invalidItems = '45jkg624y6i45g6kg45lk2h6'
    let invalidAvailable = 'pwvuiot378vn-q4'
    let invalidBlacklisted = '23b67n2346'

    // Start Server
    // Delete all records in the suppliers collection
    before(done => {
        server = require('../app')
        SupplierModel.deleteMany({}, error => {
            done()
        })
    });

    it('GET-ALL\tNumber of suppliers should be zero', done => {
        chai.request(server).get('/suppliers')
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.have.be.a('array')
                res.body.length.should.be.eql(0)
                done()
            })
    })

    it('POST\tAdding a new supplier', done => {
        chai.request(server).post('/suppliers')
            .set('content-type', 'application/json')
            .send(supplier)
            .end((error, res) => {
                res.should.have.status(201)
                res.body.should.have.be.a('object')
                done()
            })
    })

    it('GET-ALL\tNumber of suppliers should be exactly one', done => {
        chai.request(server).get('/suppliers')
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.have.be.a('array')
                res.body.length.should.be.eql(1)
                done()
            })
    })

    it('GET-ONE\tGetting one supplier', done => {
        chai.request(server).get('/suppliers/' + supplier.supplierId)
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.have.be.a('object')
                res.body.should.have.property('supplierId').eql(supplier.supplierId)
                res.body.should.have.property('name').eql(supplier.name)
                res.body.should.have.property('bankAccount').eql(supplier.bankAccount)
                res.body.should.have.property('address').eql(supplier.address)
                res.body.should.have.property('email').eql(supplier.email)
                res.body.should.have.property('contactNo').eql(supplier.contactNo)
                res.body.should.have.property('items').eql(supplier.items)
                res.body.should.have.property('available').eql(supplier.available)
                res.body.should.have.property('blacklisted').eql(supplier.blacklisted)
                done()
            })
    })


    it('PUT\tUpdating a supplier', done => {
        chai.request(server).put('/suppliers')
            .set('content-type', 'application/json')
            .send(updatedSupplier)
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.have.be.a('object')
                res.body.updatedSupplier.should.have.property('name').eql(updatedSupplier.name)
                res.body.updatedSupplier.should.have.property('bankAccount').eql(updatedSupplier.bankAccount)
                res.body.updatedSupplier.should.have.property('address').eql(updatedSupplier.address)
                res.body.updatedSupplier.should.have.property('email').eql(updatedSupplier.email)
                res.body.updatedSupplier.should.have.property('contactNo').eql(updatedSupplier.contactNo)
                res.body.updatedSupplier.should.have.property('items').eql(updatedSupplier.items)
                res.body.updatedSupplier.should.have.property('available').eql(updatedSupplier.available)
                res.body.updatedSupplier.should.have.property('blacklisted').eql(updatedSupplier.blacklisted)
                done()
            })
    })

    it('DELETE\tDeleting a supplier', done => {
        chai.request(server).del('/suppliers/' + supplier.supplierId)
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.have.be.a('object')
                done()
            })
    })

    it('POST\tRejection of supplier with invalid supplier name', done => {
        invalidSupplier = Object.assign({}, supplier)
        invalidSupplier.name = invalidName
        chai.request(server).post('/suppliers')
            .set('content-type', 'application/json')
            .send(invalidSupplier)
            .end((error, res) => {
                res.should.have.status(400)
                res.body.should.have.be.a('object')
                done()
            })
    })

    it('POST\tRejection of supplier with invalid supplier bank account', done => {
        invalidSupplier = Object.assign({}, supplier)
        invalidSupplier.bankAccount = invalidBankAccount
        chai.request(server).post('/suppliers')
            .set('content-type', 'application/json')
            .send(invalidSupplier)
            .end((error, res) => {
                res.should.have.status(400)
                res.body.should.have.be.a('object')
                done()
            })
    })

    it('POST\tRejection of supplier with invalid supplier email', done => {
        invalidSupplier = Object.assign({}, supplier)
        invalidSupplier.email = invalidEmail
        chai.request(server).post('/suppliers')
            .set('content-type', 'application/json')
            .send(invalidSupplier)
            .end((error, res) => {
                res.should.have.status(400)
                res.body.should.have.be.a('object')
                done()
            })
    })

    it('POST\tRejection of supplier with invalid supplier contact number', done => {
        invalidSupplier = Object.assign({}, supplier)
        invalidSupplier.contactNo = invalidContactNo
        chai.request(server).post('/suppliers')
            .set('content-type', 'application/json')
            .send(invalidSupplier)
            .end((error, res) => {
                res.should.have.status(400)
                res.body.should.have.be.a('object')
                done()
            })
    })

    it('POST\tRejection of supplier with invalid supplier items', done => {
        invalidSupplier = Object.assign({}, supplier)
        invalidSupplier.items = invalidItems
        chai.request(server).post('/suppliers')
            .set('content-type', 'application/json')
            .send(invalidSupplier)
            .end((error, res) => {
                res.should.have.status(400)
                res.body.should.have.be.a('object')
                done()
            })
    })

    it('POST\tRejection of supplier with invalid supplier available field', done => {
        invalidSupplier = Object.assign({}, supplier)
        invalidSupplier.available = invalidAvailable
        chai.request(server).post('/suppliers')
            .set('content-type', 'application/json')
            .send(invalidSupplier)
            .end((error, res) => {
                res.should.have.status(400)
                res.body.should.have.be.a('object')
                done()
            })
    })

    it('POST\tRejection of supplier with invalid supplier blacklisted field', done => {
        invalidSupplier = Object.assign({}, supplier)
        invalidSupplier.blacklisted = invalidBlacklisted
        chai.request(server).post('/suppliers')
            .set('content-type', 'application/json')
            .send(invalidSupplier)
            .end((error, res) => {
                res.should.have.status(400)
                res.body.should.have.be.a('object')
                done()
            })
    })

    it('POST\tRejection of supplier with invalid (Duplicate) supplier id', done => {
        invalidSupplier = Object.assign({}, supplier)
        let temp = new SupplierModel(supplier)
        SupplierModel.deleteMany().then(data => {
            temp.save().then(data => {
                chai.request(server).post('/suppliers')
                    .set('content-type', 'application/json')
                    .send(invalidSupplier)
                    .end((error, res) => {
                        res.should.have.status(400)
                        res.body.should.have.be.a('object')
                        done()
                    })
            }).catch(error => {
                console.log('Error saving')
            })
        }).catch(error => {
            console.log('Error emptying collection')
        })
    })

    it('PUT\tRejection of supplier with invalid (Not Found) supplier id', done => {
        invalidSupplier = Object.assign({}, supplier)
        invalidSupplier.supplierId = invalidSupplierId
        let temp = new SupplierModel(supplier)
        SupplierModel.deleteMany().then(data => {
            temp.save().then(data => {
                chai.request(server).put('/suppliers')
                    .set('content-type', 'application/json')
                    .send(invalidSupplier)
                    .end((error, res) => {
                        res.should.have.status(400)
                        res.body.should.have.be.a('object')
                        done()
                    })
            }).catch(error => {
                console.log('Error saving')
            })
        }).catch(error => {
            console.log('Error emptying collection')
        })
    })

    it('PUT\tRejection of supplier with invalid supplier name', done => {
        invalidSupplier = Object.assign({}, supplier)
        invalidSupplier.name = invalidName
        chai.request(server).put('/suppliers')
            .set('content-type', 'application/json')
            .send(invalidSupplier)
            .end((error, res) => {
                res.should.have.status(400)
                res.body.should.have.be.a('object')
                done()
            })
    })

    it('PUT\tRejection of supplier with invalid supplier bank account', done => {
        invalidSupplier = Object.assign({}, supplier)
        invalidSupplier.bankAccount = invalidBankAccount
        chai.request(server).put('/suppliers')
            .set('content-type', 'application/json')
            .send(invalidSupplier)
            .end((error, res) => {
                res.should.have.status(400)
                res.body.should.have.be.a('object')
                done()
            })
    })

    it('PUT\tRejection of supplier with invalid supplier email', done => {
        invalidSupplier = Object.assign({}, supplier)
        invalidSupplier.email = invalidEmail
        chai.request(server).put('/suppliers')
            .set('content-type', 'application/json')
            .send(invalidSupplier)
            .end((error, res) => {
                res.should.have.status(400)
                res.body.should.have.be.a('object')
                done()
            })
    })

    it('PUT\tRejection of supplier with invalid supplier contact number', done => {
        invalidSupplier = Object.assign({}, supplier)
        invalidSupplier.contactNo = invalidContactNo
        chai.request(server).put('/suppliers')
            .set('content-type', 'application/json')
            .send(invalidSupplier)
            .end((error, res) => {
                res.should.have.status(400)
                res.body.should.have.be.a('object')
                done()
            })
    })

    it('PUT\tRejection of supplier with invalid supplier items', done => {
        invalidSupplier = Object.assign({}, supplier)
        invalidSupplier.items = invalidItems
        chai.request(server).put('/suppliers')
            .set('content-type', 'application/json')
            .send(invalidSupplier)
            .end((error, res) => {
                res.should.have.status(400)
                res.body.should.have.be.a('object')
                done()
            })
    })

    it('PUT\tRejection of supplier with invalid supplier available field', done => {
        invalidSupplier = Object.assign({}, supplier)
        invalidSupplier.available = invalidAvailable
        chai.request(server).put('/suppliers')
            .set('content-type', 'application/json')
            .send(invalidSupplier)
            .end((error, res) => {
                res.should.have.status(400)
                res.body.should.have.be.a('object')
                done()
            })
    })

    it('PUT\tRejection of supplier with invalid supplier blacklisted field', done => {
        invalidSupplier = Object.assign({}, supplier)
        invalidSupplier.blacklisted = invalidBlacklisted
        chai.request(server).put('/suppliers')
            .set('content-type', 'application/json')
            .send(invalidSupplier)
            .end((error, res) => {
                res.should.have.status(400)
                res.body.should.have.be.a('object')
                done()
            })
    })
})