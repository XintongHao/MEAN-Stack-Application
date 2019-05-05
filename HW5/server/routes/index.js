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

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/oauth2callback', passport.authenticate('google', {
  // successRedirect: 'https://localhost:4200/profile',
  successRedirect: '/profile',
  failureRedirect: '/'
}));

router.get('/profile', function(req, res) {
  // res.redirect('https://localhost:4200/profile');
  res.send(req.user);
});

router.get('/logout', function(req, res) {
  req.logout();
  req.flash("success", "LOGGED YOU OUT!");
  res.redirect('/');
});

module.exports = router;
