const Express           = require("express");
const Routes            = Express.Router();
const PaymentRoute      = require('./Payment/Payment.Route');
const UserRoute         = require('./Users/User.Route');
const ItemRoute         = require("./Item/Item.Route");


Routes.use('/payments' , PaymentRoute);
Routes.use('/users' , UserRoute);
Routes.use('/item' , ItemRoute);

module.exports = Routes;
