process.env.NODE_ENV = 'test'

let mongoose = require('../Model/Order')
let OrderModel = mongoose.model('Order')
let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()
chai.use(chaiHttp);

describe('Order', () => {
    let server;
    let order = {
        orderID: 'O0001',
        itemName: 'item1',
        requestId: 'R0001',
        quantity: 'item1',
        unitPrice: 'O0001',
        orderDate: '2017/08/10'
    }


    // Start Server
    // Delete all records in the orders collection
    before(done => {
        server = require('../app')
        OrderModel.deleteMany({}, error => {
            done()
        })
    });

    it('GET-ALL\tNumber of orders should be zero', done => {
        chai.request(server).get('/orders')
            .end((error, res) => {
                res.should.have.status(204)
                // res.body.should.have.be.a('array')
                res.body.length.should.be.eql(0)
                done()
            })
    })

    it('POST\tAdding a new order', done => {
        chai.request(server).post('/orders')
            .set('content-type', 'application/json')
            .send(order)
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.have.be.a('object')
                done()
            })
    })

    it('GET-ALL\tNumber of orders should be exactly one', done => {
        chai.request(server).get('/orders')
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.have.be.a('array')
                res.body.length.should.be.eql(1)
                done()
            })
    })

})