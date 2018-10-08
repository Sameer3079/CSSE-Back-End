process.env.NODE_ENV = 'test'

let mongoose                                = require('../Model/Request')
let ReqestModel                             = mongoose.model("Request")
let chai                                    = require('chai')
let chaiHttp                                = require('chai-http')
let should                                  = chai.should()

chai.use(chaiHttp);

describe('Material Request' , () => {

    // declare server variable.
    let server;

    // create mock data object.
    let request = {    
        itemName : "cement",
        qty : 10
    }

    // create empty request object for negative test
    let negativeRequest ={}
    
    
    
    /**
     * Start Server
     * Delete all records in the requests collection in database. 
     */
    before((done) => {
        server = require('../app')
        ReqestModel.deleteMany({}, (error) => {
            done()
        })
    });



    it('GET-ALL\tDisplay message can not find data', (done) => {
        chai.request(server).get('/request')
            .end((error, res) => {
                res.should.have.status(205)
                res.body.should.have.be.a('object')
                done()
            })
    })


    it('POST\tReject Create a new Reqest', (done) => {
        chai.request(server).post('/request')
            .set('content-type', 'application/json')
            .send(negativeRequest)
            .end((error, res) => {
                res.should.have.status(404)
                res.body.should.have.be.a('object')
                done()
            })
    })

    it('POST\tCreate New Reqest', (done) => {
        chai.request(server).post('/request')
            .set('content-type', 'application/json')
            .send(request)
            .end((error, res) => {
                res.should.have.status(201)
                res.body.should.have.be.a('object')
                done()
            })
    })
})