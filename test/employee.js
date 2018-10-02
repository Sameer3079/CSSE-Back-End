process.env.NODE_ENV = 'test'

let mongoose = require('../Model/Employee')
let EmployeeModel = mongoose.model('Employee')
let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()
chai.use(chaiHttp);

describe('Employees', () => {
    let server;
    let employee = {
        empId: "IT16005372",
        type: "Site Manager",
        firstName: "Sameer",
        lastName: "Basil",
        address: "Colombo",
        email: "smrbasil@gmail.com",
        contactNo: "0770695817"
    }
    let updatedEmployee = {
        empId: "IT16005372",
        type: "Site Manager",
        firstName: "Sameer",
        lastName: "Basil",
        address: "Colombo",
        email: "smrbasil@gmail.com",
        contactNo: "0770695817"
    }

    before((done) => {
        server = require('../app')
        EmployeeModel.deleteMany({}, (error) => {
            done()
        })
    });

    it('GET-ALL\tNumber of employees should be zero', (done) => {
        chai.request(server).get('/employees')
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.have.be.a('array')
                res.body.length.should.be.eql(0)
                done()
            })
    })

    it('POST\tAdding a new employee', (done) => {
        chai.request(server).post('/employees')
            .set('content-type', 'application/json')
            .send(employee)
            .end((error, res) => {
                res.should.have.status(201)
                res.body.should.have.be.a('object')
                done()
            })
    })

    it('GET-ALL\tNumber of employees should be exactly one', (done) => {
        chai.request(server).get('/employees')
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.have.be.a('array')
                res.body.length.should.be.eql(1)
                done()
            })
    })

    it('GET-ONE\tGetting one employee', (done) => {
        chai.request(server).get('/employees/' + employee.empId)
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.have.be.a('object')
                done()
            })
    })


    it('PUT\tUpdating an employee', (done) => {
        chai.request(server).put('/employees')
            .set('content-type', 'application/json')
            .send(updatedEmployee)
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.have.be.a('object')
                done()
            })
    })

    it('DELETE\tDeleting an employee', (done) => {
        chai.request(server).del('/employees/' + employee.empId)
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.have.be.a('object')
                done()
            })
    })

})