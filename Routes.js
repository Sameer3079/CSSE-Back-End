const Express           = require("express");
const Routes            = Express.Router();
const PaymentRoute      = require('./Payment/Payment.Route');
const UserRoute         = require('./Users/User.Route');
const ItemRoute         = require("./Item/Item.Route");
const OrderRoute        = require('./Order/Order.Route');

const employeeRoute = require('./Employee/Employee.Route')
const supplierRoute = require('./Supplier/Supplier.Route')
const businessPolicyRoute = require('./BusinessPolicy/BusinessPolicy.Route')
const siteRoute = require('./Site/Site.Route')

Routes.use('/payments' , PaymentRoute);
Routes.use('/users' , UserRoute);
Routes.use('/items' , ItemRoute);
Routes.use('/orders' , OrderRoute);

Routes.use('/site' , siteRoute);

Routes.use('/employees', employeeRoute)
Routes.use('/suppliers', supplierRoute)
Routes.use('/business-policies', businessPolicyRoute)

module.exports = Routes;
