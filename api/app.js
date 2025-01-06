if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const config = require('./config');


const setupSecurity = require('./middleware/Security/security');
const { errorHandler } = require('./middleware/Error/errorHandler');


var usersRouter = require('./routes/Users/users');
var productsRouter = require('./routes/Product/product');
var cartRouter = require('./routes/Cart/Carts');
var categoryRouter = require('./routes/Category/category');
var OrderRouter = require('./routes/Order/Orders');
var PaymentRouter = require('./routes/Payment/Payment');
var SellerRouter = require('./routes/Seller/Seller');
const statisticsRouter = require('./routes/Statistics/statistics');

var app = express();


setupSecurity(app);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/carts', cartRouter);
app.use('/api/product', productsRouter);
app.use('/api/category', categoryRouter);
app.use('/api/users', usersRouter);
app.use('/api/orders', OrderRouter);
app.use('/api/payment', PaymentRouter);
app.use('/api/seller', SellerRouter);
app.use('/api/statistics', statisticsRouter);


app.use((req, res, next) => {
  next(createError(404));
});


app.use(errorHandler);

console.log('MongoDB URL:', process.env.MONGODB_URI);

module.exports = app;
