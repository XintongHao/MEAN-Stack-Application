const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require("../models/user");

// let db;
// const mongoUtil = require('../MongoUtil');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/userList', function(req, res, next) {
  User.find({}, function(err, allUsers) {
    if(err){
      console.log(err);
    } else {
      res.send(allUsers);
    }
  })
  // mongoUtil.connect( function(err, client) {
  //   if(err) console.log(err);
  //   db = mongoUtil.getDB();
  //   db.collection("users").find({}).toArray(function(err, result) {
  //     if(err) throw err;
  //     console.log(result);
  //     res.send(result);
  //     // res.write(JSON.stringify({success: true, UserList: result}, null, 2));
  //     res.end();
  //
  //   })
  // });
});

router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// router.get('/oauth2callback', passport.authenticate('google', {
//   // successRedirect: 'https://localhost:4200/profile',
//   successRedirect: '/profile',
//   failureRedirect: '/'
// }));

router.get('/auth/oauth2callback', passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
      // return res.redirect('/profile/?' + req.user._id);
      console.log("IN SERVER OAUTH CALLBACK", req.user);
      return res.redirect('/profile/?' + req.user._id);
      // return res.redirect('https://localhost:4200/profile/?' + req.user._id);
    });

router.get('/profile', function(req, res) {
  // res.send('https://localhost:4200/profile');
  res.send(req.user);
});

router.get('/auth/logout', function(req, res) {
  req.logout();
  req.flash("success", "LOGGED YOU OUT!");
  res.redirect('/');
});

module.exports = router;
