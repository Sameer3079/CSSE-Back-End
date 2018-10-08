process.env.NODE_ENV = 'test'

let mongoose = require('../Model/Payment')
let PaymentModel = mongoose.model('Payment')
let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()
chai.use(chaiHttp);

describe('Payment', () => {
    let server;
    let payment = {
        orderId: 'O0001',
        supplierName: 'CRT',
        date: '2017/08/10',
        bankAccountNumber: 1255455,
        amount: 15500,
        status: true
      }


    // Start Server
    // Delete all records in the payment collection
    before(done => {
        server = require('../app')
        PaymentModel.deleteMany({}, error => {
            done()
        })
    });

    it('GET-ALL\tNumber of payments should be zero', done => {
        chai.request(server).get('/payments')
            .end((error, res) => {
                res.should.have.status(204)
              //  res.body.should.have.be.a('array')
                res.body.length.should.be.eql(0)
                done()
            })
    })

    it('POST\tAdding a new payment', done => {
        chai.request(server).post('/payments')
            .set('content-type', 'application/json')
            .send(payment)
            .end((error, res) => {
                res.should.have.status(201)
                res.body.should.have.be.a('object')
                done()
            })
    })

    it('GET-ALL\tNumber of orders should be exactly one', done => {
        chai.request(server).get('/payments')
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.have.be.a('array')
                res.body.length.should.be.eql(1)
                done()
            })
    })
})