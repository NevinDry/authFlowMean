var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var usersRouter = require('./api/routes/users');
const { handleError } = require('./api/helpers/errors-helper');

var app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public/angularApp')));

app.use('/users', usersRouter);

// error handler
app.use((err, req, res, next) => {
  handleError(err, res);
});

module.exports = app;
