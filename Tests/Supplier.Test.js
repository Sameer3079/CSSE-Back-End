let mongoose                                = require('../Model/Supplier');
let SupplierModel                           = mongoose.model("Supplier");
let chai                                    = require('chai');
let chaiHttp                                = require('chai-http');
let should                                  = chai.should();

chai.use(chaiHttp);


describe('Supplier Test' , () => {

   // declare server variable.
   let server;
   
   // create mock data object.
   let supplier = {    
    supplierName : "Sunil",
    bankAccount : "12121212",
    nic : "906754321V",
    address : "Colombo",
    email : "sunil@gmail.com",
    phone : "0718906767",
    items : "Cement",
   }

   //invalied data object
   let invaliedSupplier = {}

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

    it('POST\tReject Create a new supplier', (done) => {
        chai.request(server).post('/request')
            .set('content-type', 'application/json')
            .send(supplier)
            .end((error, res) => {
                res.should.have.status(404)
                res.body.should.have.be.a('object')
                done()
            })
    })

    it('POST\tCreate New supplier', (done) => {
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