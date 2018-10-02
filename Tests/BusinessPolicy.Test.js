process.env.NODE_ENV = 'test'

let mongoose = require('../Model/BusinessPolicy')
let BusinessPolicyModel = mongoose.model('BusinessPolicy')
let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()
chai.use(chaiHttp);

describe('Business Policies', () => {
    let server;
    let businessPolicy = {
        policyId: 'BP_3079',
        description: 'Test policy'
    }
    let updatedBusinessPolicy = {
        policyId: 'BP_3079',
        description: 'Test policy updated'
    }

    // Start Server
    // Delete all records in the businessPolicies collection
    before((done) => {
        server = require('../app')
        BusinessPolicyModel.deleteMany({}, (error) => {
            done()
        })
    });

    it('GET-ALL\tNumber of policies should be zero', (done) => {
        chai.request(server).get('/business-policies')
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.have.be.a('array')
                res.body.length.should.be.eql(0)
                done()
            })
    })

    it('POST\tAdding a new policy', (done) => {
        chai.request(server).post('/business-policies')
            .set('content-type', 'application/json')
            .send(businessPolicy)
            .end((error, res) => {
                res.should.have.status(201)
                res.body.should.have.be.a('object')
                done()
            })
    })

    it('GET-ALL\tNumber of policies should be exactly one', (done) => {
        chai.request(server).get('/business-policies')
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.have.be.a('array')
                res.body.length.should.be.eql(1)
                done()
            })
    })

    it('GET-ONE\tGetting one policy', (done) => {
        chai.request(server).get('/business-policies/' + businessPolicy.policyId)
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.have.be.a('object')
                res.body.should.have.property('policyId').eql(businessPolicy.policyId)
                res.body.should.have.property('description').eql(businessPolicy.description)
                done()
            })
    })


    it('PUT\tUpdating a policy', (done) => {
        chai.request(server).put('/business-policies')
            .set('content-type', 'application/json')
            .send(updatedBusinessPolicy)
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.have.be.a('object')
                res.body.updatedBusinessPolicy.should.have.property('policyId').eql(updatedBusinessPolicy.policyId)
                res.body.updatedBusinessPolicy.should.have.property('description').eql(updatedBusinessPolicy.description)
                done()
            })
    })

    it('DELETE\tDeleting a policy', (done) => {
        chai.request(server).del('/business-policies/' + businessPolicy.policyId)
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.have.be.a('object')
                done()
            })
    })

})