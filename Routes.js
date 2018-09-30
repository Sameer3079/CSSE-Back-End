const Express           = require("express");
const Routes            = Express.Router();
const PaymentRoute      = require('./Payment/Payment.Route');
const UserRoute         = require('./Users/User.Route');
const ItemRoute         = require("./Item/Item.Route");
const SiteRoute         = require('./Site/Site.Route');
const OrderRoute        = require('./Order/Order.Route');

Routes.use('/payments' , PaymentRoute);
Routes.use('/users' , UserRoute);
Routes.use('/items' , ItemRoute);
Routes.use('/sites' , SiteRoute);
Routes.use('/orders' , OrderRoute);

module.exports = Routes;
