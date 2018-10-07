process.env.NODE_ENV = 'test'

let mongoose = require('../Model/Site')
let SiteModel = mongoose.model('Site')
let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()
chai.use(chaiHttp)

describe('Site', () => {
    let server
    let site = {
        siteName: 'Colombo',
        address: 'Colombo',
        items: ['Cement', 'Bricks'],
        storageCapacity: 5000.00,
        currentCapacity: 2500.00,
        siteManager: 'Sajith'
    }

    before(done => {
        server = require('../app')
        SiteModel.deleteMany().then(data => {
            done()
        })
    })

    it('GET', done => {
        chai.request(server).get('/site')
            .end((error, res) => {
                res.should.have.status(204)
                done()
            })
    })

    it('POST', done => {
        chai.request(server).post('/site')
            .set('content-type', 'application/json')
            .send(site)
            .end((error, res) => {
                res.should.have.status(201)
                res.body.should.have.be.a('object')
                done()
            })
    })

    it('POST', done => {
        site.siteName = undefined
        chai.request(server).post('/site')
            .set('content-type', 'application/json')
            .send()
            .end((error, res) => {
                res.should.have.status(400)
                res.body.should.have.be.a('object')
                done()
            })
    })

    it('GET', done => {
        chai.request(server).get('/site')
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.have.be.a('array')
                res.body.length.should.be.eql(1)
                done()
            })
    })
})