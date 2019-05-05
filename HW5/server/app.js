/*
* In the project, instead of using 'mongodb' package, I used 'mongoose' to store the google user's data.
* Mongoose provides a more convenient way to model the data and manage the data in MongoDB.
* The model scheme can be found in models/user.js
* */

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

const mongoose = require('mongoose');
const User = require('./models/user');
mongoose.connect("mongodb://localhost:27017/HW5", { useNewUrlParser: true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '"X-PINGOTHER,X-Requested-With,Accept,Content-Type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
// use it before all route definitions
app.use(cors());


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

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

// passport.serializeUser((user, done)=> {
//   done(null, user);
// });
//
// passport.deserializeUser((user, done) => {
//     done(null, user);
//   // db.collection('users').find({},
//   //     {projection: {
//   //         '_id': user._id,
//   //       }}, function(err, result) {
//   //             if(err) throw err;
//   //             console.log("In deserializeUser", user);
//   //             done(null, user);
//   //     })
// });

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
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
                    User.findOne({'googleID': profile.id}, function(err, user){
                        if(err)
                            return done(err);
                        if(user) {
                            console.log('User has already sign in: ', user);
                            return done(null, user);
                        } else {
                                new User({
                                    googleID: profile.id,
                                    username: profile.displayName,
                                    email: (profile.emails[0].value || '').toLowerCase() // put the first email
                                }).save().then((newUser) => {
                                    console.log('Create a new User: ', newUser);
                                    return done(null, newUser);
                                });
                        }
                    })
                }
            })
        })
);
// passport.use(
//     new GoogleStrategy({
//       clientID: googleConfig.client_id,
//       clientSecret: googleConfig.client_secret,
//       callbackURL: googleConfig.redirect_url,
//       passReqToCallback: true
//     },
//     function(req, token, refreshToken, profile, done) {
//       process.nextTick(function() {
//         if(!req.user) {
//           db.collection('users').findOne({}, {projection: {'_id': profile._id}}, function(err, user){
//             if(err)
//               return done(err);
//             if(user) {
//               console.log('User has already sign in: ', user);
//               return done(null, user);
//             } else {
//               try{
//                 const newUser = {
//                   googleID: profile.id,
//                   username: profile.displayName,
//                   email: (profile.emails[0].value || '').toLowerCase() // put the first email
//                 };
//                 db.collection('users').insertOne(newUser, function(err, res) {
//                   if(err) throw err;
//                   console.log('Create a new user: ', newUser);
//                   return done(null, newUser);
//                 })
//                     // .then(() => {
//                 //   console.log('Create a new user');
//                 //   return done(null, user);
//                 // })
//               } catch (e) {
//                 console.log(e);
//               }
//             }
//           })
//         }
//       })
//     })
// );

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
