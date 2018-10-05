process.env.NODE_ENV        = 'test';
let Mongoose                = require('../Model/Order');
let OrderModel              = Mongoose.model('Order');
let chai                    = require('chai');
let chaiHttp                = require('chai-http');
let should                  = chai.should();

chai.use(chaiHttp);

describe('Order Test', () => {

    // declare server variable.
    let server;

    // create mock data order object.
    let order = {
        
        items : "cement",
        quentity : 10,
        orderDate : "2018-10-10",
        supplierName : "Sunil",
        
    }

    /**
     * Negative test case for create new order
     * We pass incorect data type value with request body.
     */

    
    let incorrectOrder = {
        
        items : "cement",
        quentity : "10",
        orderDate : "2018-10-10",
        supplierName : "Sunil",
        
    }

    
    // Start Server
    // Delete all records in the businessPolicies collection
    before((done) => {
        server = require('../app')
        OrderModel.deleteMany({}, (error) => {
            done()
        })
    });


    // Positive test.
    it('POST\tAdding a new order', (done) => {
        chai.request(server).post('/orders')
            .set('content-type', 'application/json')
            .send(order)
            .end((error, res) => {
                res.should.have.status(201)
                res.body.should.have.be.a('object')
                done()
            })
    })

    // Positive test.
    it('GET-ALL\tGet all orders', (done) => {
        chai.request(server).get('/orders')
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.have.be.a('array')
                res.body.length.should.be.eql(1)
                done()
            })
    })


    // Negative test case for create new order. 
    it('POST\tAdding a new order', (done) => {
        chai.request(server).post('/orders')
            .set('content-type', 'application/json')
            .send(incorrectOrder)
            .end((error, res) => {
                res.should.have.status(201)
                res.body.should.have.be.a('object')
                done()
            })
    })



   

})