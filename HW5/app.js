/*
* This homework I used 'mongodb' package to store the google user's data (googleId, username, first email)
* Since the database only stored one type of data,
* I didn't use Model Schema which was really useful when came to multiple data types.
* (I prefer to use 'mongoose' when have multiple data types since it has a more convenient model Schema method)
*
*
* */

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// Connect to mongoDB

let db;
const mongoUtil = require('./MongoUtil');
mongoUtil.connect( function(err, client) {
  if(err) console.log(err);
  db = mongoUtil.getDB();
  console.log(db.collection('users').findOne({}, function(err, result) {
    if(err) throw err;
    console.log(result);
  }));
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Passport configuration
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const googleConfig = require('./config/googleConfig');

app.use(require('express-session')({
  secret: "I AM GROOT!",
  resave: false,
  saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done)=> {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  db.collection('users').find({},
      {projection: {
          '_id': user._id,
        }}, function(err, result) {
              if(err) throw err;
              console.log("In deserializeUser", user);
              done(null, user);
      })
});

passport.use(
    new GoogleStrategy({
      clientID: googleConfig.client_id,
      clientSecret: googleConfig.client_secret,
      callbackURL: googleConfig.redirect_url,
      passReqToCallback: true
    },
    function(req, token, refreshToken, profile, done) {
      process.nextTick(function() {
        if(!req.user) {
          db.collection('users').findOne({}, {projection: {'_id': profile._id}}, function(err, user){
            if(err)
              return done(err);
            if(user) {
              console.log('User has already sign in: ', user);
              return done(null, user);
            } else {
              try{
                const newUser = {
                  googleID: profile.id,
                  username: profile.displayName,
                  email: (profile.emails[0].value || '').toLowerCase() // put the first email
                };
                db.collection('users').insertOne(newUser, function(err, res) {
                  if(err) throw err;
                  console.log('Create a new user: ', newUser);
                  return done(null, newUser);
                })
                    // .then(() => {
                //   console.log('Create a new user');
                //   return done(null, user);
                // })
              } catch (e) {
                console.log(e);
              }
            }
          })
        }
      })
    })
);

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

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
