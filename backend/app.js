var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require('./models/index');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

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

done = {}

db.mongoose
  .connect("mongodb+srv://admin:adminpassword@cluster0.1tmoe.mongodb.net/boilermake?retryWrites=true&w=majority")
  // .connect("mongodb://127.0.0.1:27017")
  .then(() => {
    console.log("Successfully connected to the database");
    done.mongo = true;
    return;
  })
  .catch((err) => {
    console.log(err.message);
    console.log("Unable to connect to the database");
    process.exit(1);
  });