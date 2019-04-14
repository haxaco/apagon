if(process.env.NODE_ENV === 'local') {
  require('dotenv').config();
}
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var cors = require('cors');
const RateLimit = require('express-rate-limit');
const helmet = require('helmet');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(cors());

const limiter = new RateLimit({
  windowMs: parseInt(process.env.WINDOW_MS || 60000, 10),
  max: parseInt(process.env.MAX_IP_REQUESTS || 5000, 10),
  delayMs:parseInt(process.env.DELAY_MS || 0, 10),
  headers: true
});
app.use(limiter);
app.use(helmet());
app.use(function(req, res, next) {
  res.setHeader('Server', '');
  res.setHeader('Via', '');
  next();
});
app.use(helmet.hsts({
  maxAge: 31536000,
  preload: false
}));

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.sendStatus(err.status || 500);
});

module.exports = app;
