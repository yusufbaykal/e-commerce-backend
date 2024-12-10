if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const config = require('./config');

var usersRouter = require('./routes/Users/users');
var productsRouter = require('./routes/Product/product');
var cartRouter = require('./routes/Cart/Carts');
var categoryRouter = require('./routes/Category/category');
var OrderRouter = require('./routes/Order/Orders');
var PaymentRouter = require('./routes/Payment/Payment');
var SellerRouter = require('./routes/Seller/Seller');
const { mongo } = require('mongoose');

var app = express();

// view engine setup
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

app.use((req, res, next) => {
  res.status(404).send({ error: 'Route Not Found' });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({ error: true, message: 'Route Not Found' });
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: true,
    message: err.message || 'Internal Server Error',
    stack: req.app.get('env') === 'development' ? err.stack : undefined,
  });
});

console.log('MongoDB URL:', process.env.MONGODB_URI);

module.exports = app;
