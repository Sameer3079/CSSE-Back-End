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
        supplierId: "SP001",
        name: "Sameer Basil",
        bankAccount: "00005848451231",
        address: "Boralasgamuwa",
        email: "smrbasil4@gmail.com",
        contactNo: "0716650678",
        items: ["ihjkb456hj4k560", "jh435kjh345bk45b"],
        available: true,
        blacklisted: false
    }
    let updatedSupplier = {
        supplierId: "SP001",
        name: "Sameer Hilmy",
        bankAccount: "00005848451231",
        address: "Boralasgamuwa",
        email: "smrbasil4@gmail.com",
        contactNo: "0716650678",
        items: ["ihjkb456hj4k560", "jh435kjh345bk45b"],
        available: true,
        blacklisted: false
    }

    // Start Server
    // Delete all records in the suppliers collection
    before((done) => {
        server = require('../app')
        SupplierModel.deleteMany({}, (error) => {
            done()
        })
    });

    it('GET-ALL\tNumber of suppliers should be zero', (done) => {
        chai.request(server).get('/suppliers')
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.have.be.a('array')
                res.body.length.should.be.eql(0)
                done()
            })
    })

    it('POST\tAdding a new supplier', (done) => {
        chai.request(server).post('/suppliers')
            .set('content-type', 'application/json')
            .send(supplier)
            .end((error, res) => {
                res.should.have.status(201)
                res.body.should.have.be.a('object')
                done()
            })
    })

    it('GET-ALL\tNumber of suppliers should be exactly one', (done) => {
        chai.request(server).get('/suppliers')
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.have.be.a('array')
                res.body.length.should.be.eql(1)
                done()
            })
    })

    it('GET-ONE\tGetting one supplier', (done) => {
        chai.request(server).get('/suppliers/' + supplier.supplierId)
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.have.be.a('object')
                done()
            })
    })


    it('PUT\tUpdating a supplier', (done) => {
        chai.request(server).put('/suppliers')
            .set('content-type', 'application/json')
            .send(updatedSupplier)
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.have.be.a('object')
                done()
            })
    })

    it('DELETE\tDeleting a supplier', (done) => {
        chai.request(server).del('/suppliers/' + supplier.supplierId)
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.have.be.a('object')
                done()
            })
    })

})