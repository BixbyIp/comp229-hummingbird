
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let session = require('express-session')
let passport = require('passport')
let passportLocal = require('passport-local')
let localStrategy = passportLocal.Strategy
let flash = require('connect-flash')


// database setup
let mongoose = require('mongoose');
let DB = require('./db');

//point mongoose to the DB URI
mongoose.connect(DB.URI,{useNewUrlParser: true,useUnifiedTopology: true});

let mongoDB = mongoose.connection;
mongoDB.on('error',console.error.bind(console,'Connection Error:'));
mongoDB.once('open',()=>{
  console.log('Connected to MongoDB...');
});


let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let surveyRouter = require('../routes/survey')

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs'); // express -e

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

app.use('/css', express.static(path.join(__dirname, '../../node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, '../../node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, '../../node_modules/bootstrap/js/dist')))
app.use('/js', express.static(path.join(__dirname, '../../node_modules/jquery/dist')))
app.use('/image', express.static(path.join(__dirname, '../../public/assets/images')))
app.use('/document', express.static(path.join(__dirname, '../../public/assets/docs')))

//setup express session
app.use(session({
   secret: "SomeSecret",
   saveUninitialized: false,
   resave: false
}));

// initialize flash
app.use(flash());

// initialize passport
app.use(passport.initialize())
app.use(passport.session())

// passport user configuration

// create a User Model Instance
let userModel = require('../models/user')
let User = userModel.User;

// implement a user authentication strategy
passport.use(User.createStrategy())

// serialize and deserialize the User info
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/survey',surveyRouter)

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
  res.render('error',{ title: 'Error' });
});

module.exports = app;

// handle POST data
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));
