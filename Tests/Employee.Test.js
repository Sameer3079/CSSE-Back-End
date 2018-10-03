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
        empId: 'IT16005372',
        type: 'Site Manager',
        firstName: 'Sameer',
        lastName: 'Basil',
        address: 'Colombo',
        email: 'smrbasil@gmail.com',
        contactNo: '0770695817'
    }
    let updatedEmployee = {
        empId: 'IT16005372',
        type: 'Site Manager',
        firstName: 'Sameer',
        lastName: 'Basil',
        address: 'Colombo',
        email: 'smrbasil@gmail.com',
        contactNo: '0770695817'
    }
    let invalidEmployee = undefined
    let invalidEmpId = 'IT16005372'
    let invalidType = 'sjkldghklsdfj'
    let invalidFirstName = '4563456bjhkjbh'
    let invalidLastName = '3456b345jh7g4357jh347h'
    let invalidEmail = 'bkjhg2345kjg236hkjg'
    let invalidContactNo = '81230hgjkfdgkj'

    before((done) => {
        server = require('../app')
        EmployeeModel.deleteMany({}, error => {
            done()
        })
    });

    it('GET-ALL\tNumber of employees should be zero', done => {
        chai.request(server).get('/employees')
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.have.be.a('array')
                res.body.length.should.be.eql(0)
                done()
            })
    })

    it('POST\tAdding a new employee', done => {
        chai.request(server).post('/employees')
            .set('content-type', 'application/json')
            .send(employee)
            .end((error, res) => {
                res.should.have.status(201)
                res.body.should.have.be.a('object')
                done()
            })
    })

    it('GET-ALL\tNumber of employees should be exactly one', done => {
        chai.request(server).get('/employees')
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.have.be.a('array')
                res.body.length.should.be.eql(1)
                done()
            })
    })

    it('GET-ONE\tGetting one employee', done => {
        chai.request(server).get('/employees/' + employee.empId)
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.have.be.a('object')
                res.body.should.have.property('empId').eql(employee.empId)
                res.body.should.have.property('type').eql(employee.type)
                res.body.should.have.property('firstName').eql(employee.firstName)
                res.body.should.have.property('lastName').eql(employee.lastName)
                res.body.should.have.property('address').eql(employee.address)
                res.body.should.have.property('email').eql(employee.email)
                res.body.should.have.property('contactNo').eql(employee.contactNo)
                done()
            })
    })


    it('PUT\tUpdating an employee', done => {
        chai.request(server).put('/employees')
            .set('content-type', 'application/json')
            .send(updatedEmployee)
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.have.be.a('object')
                res.body.updatedEmployee.should.have.property('type').eql(updatedEmployee.type)
                res.body.updatedEmployee.should.have.property('firstName').eql(updatedEmployee.firstName)
                res.body.updatedEmployee.should.have.property('lastName').eql(updatedEmployee.lastName)
                res.body.updatedEmployee.should.have.property('address').eql(updatedEmployee.address)
                res.body.updatedEmployee.should.have.property('email').eql(updatedEmployee.email)
                res.body.updatedEmployee.should.have.property('contactNo').eql(updatedEmployee.contactNo)
                done()
            })
    })

    it('DELETE\tDeleting an employee', done => {
        chai.request(server).del('/employees/' + employee.empId)
            .end((error, res) => {
                res.should.have.status(200)
                res.body.should.have.be.a('object')
                done()
            })
    })

    it('POST\tRejection of employee with invalid employee type', done => {
        invalidEmployee = Object.assign({}, employee);
        invalidEmployee.type = invalidType
        chai.request(server).post('/employees')
            .set('content-type', 'application/json')
            .send(invalidEmployee)
            .end((error, res) => {
                res.should.have.status(400)
                res.should.have.be.a('object')
                done()
            })
    })

    it('POST\tRejection of employee with invalid employee firstName', done => {
        invalidEmployee = Object.assign({}, employee);
        invalidEmployee.firstName = invalidFirstName
        chai.request(server).post('/employees')
            .set('content-type', 'application/json')
            .send(invalidEmployee)
            .end((error, res) => {
                res.should.have.status(400)
                res.should.have.be.a('object')
                done()
            })
    })

    it('POST\tRejection of employee with invalid employee lastName', done => {
        invalidEmployee = Object.assign({}, employee);
        invalidEmployee.lastName = invalidLastName
        chai.request(server).post('/employees')
            .set('content-type', 'application/json')
            .send(invalidEmployee)
            .end((error, res) => {
                res.should.have.status(400)
                res.should.have.be.a('object')
                done()
            })
    })

    it('POST\tRejection of employee with invalid employee email', done => {
        invalidEmployee = Object.assign({}, employee);
        invalidEmployee.email = invalidEmail
        chai.request(server).post('/employees')
            .set('content-type', 'application/json')
            .send(invalidEmployee)
            .end((error, res) => {
                res.should.have.status(400)
                res.should.have.be.a('object')
                done()
            })
    })

    it('POST\tRejection of employee with invalid employee contact number', done => {
        invalidEmployee = Object.assign({}, employee);
        invalidEmployee.contactNo = invalidContactNo
        chai.request(server).post('/employees')
            .set('content-type', 'application/json')
            .send(invalidEmployee)
            .end((error, res) => {
                res.should.have.status(400)
                res.should.have.be.a('object')
                done()
            })
    })

    it('POST\tRejection of employee with invalid employee ID', done => {
        invalidEmployee = Object.assign({}, employee);
        invalidEmployee.empId = invalidEmpId
        EmployeeModel.deleteMany().then((qwe) => {
            let temp = new EmployeeModel(employee)
            temp.save().then((data) => {
                chai.request(server).post('/employees')
                    .set('content-type', 'application/json')
                    .send(invalidEmployee)
                    .end((error, res) => {
                        res.should.have.status(400)
                        res.should.have.be.a('object')
                        done()
                    })
            }).catch(err => {
                console.log('saving error')
            })
        }).catch(err => {
            console.log('deleting error')
        })
    })

    // --------
    it('PUT\tRejection of employee with invalid employee type', done => {
        invalidEmployee = Object.assign({}, employee);
        invalidEmployee.type = invalidType
        chai.request(server).put('/employees')
            .set('content-type', 'application/json')
            .send(invalidEmployee)
            .end((error, res) => {
                res.should.have.status(400)
                res.should.have.be.a('object')
                done()
            })
    })

    it('PUT\tRejection of employee with invalid employee firstName', done => {
        invalidEmployee = Object.assign({}, employee);
        invalidEmployee.firstName = invalidFirstName
        chai.request(server).put('/employees')
            .set('content-type', 'application/json')
            .send(invalidEmployee)
            .end((error, res) => {
                res.should.have.status(400)
                res.should.have.be.a('object')
                done()
            })
    })

    it('PUT\tRejection of employee with invalid employee lastName', done => {
        invalidEmployee = Object.assign({}, employee);
        invalidEmployee.lastName = invalidLastName
        chai.request(server).put('/employees')
            .set('content-type', 'application/json')
            .send(invalidEmployee)
            .end((error, res) => {
                res.should.have.status(400)
                res.should.have.be.a('object')
                done()
            })
    })

    it('PUT\tRejection of employee with invalid employee email', done => {
        invalidEmployee = Object.assign({}, employee);
        invalidEmployee.email = invalidEmail
        chai.request(server).put('/employees')
            .set('content-type', 'application/json')
            .send(invalidEmployee)
            .end((error, res) => {
                res.should.have.status(400)
                res.should.have.be.a('object')
                done()
            })
    })

    it('PUT\tRejection of employee with invalid employee contact number', done => {
        invalidEmployee = Object.assign({}, employee);
        invalidEmployee.contactNo = invalidContactNo
        chai.request(server).put('/employees')
            .set('content-type', 'application/json')
            .send(invalidEmployee)
            .end((error, res) => {
                res.should.have.status(400)
                res.should.have.be.a('object')
                done()
            })
    })

})