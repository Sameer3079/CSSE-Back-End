process.env.NODE_ENV = 'test'
 let mongoose = require('../Model/Order')
let OrderModel = mongoose.model('Order')
let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()
chai.use(chaiHttp);

let server;

it('GET-ALL\tNumber of orders should be zero', (done) => {
    chai.request(server).get('/orders')
        .end((error, res) => {
            res.should.have.status(200)
            res.body.should.have.be.a('array')
            res.body.length.should.be.eql(0)
            done()
        })
})