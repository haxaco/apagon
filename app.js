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

app.use(function(req, res, next) {
  res.setHeader('Server', '');
  res.setHeader('Via', '');
  next();
});
app.use(helmet.hsts({
  maxAge: 31536000,
  preload: false,
  setIf: function() {
    return process.env.NODE_ENV === 'local' ? false : true;
  }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
