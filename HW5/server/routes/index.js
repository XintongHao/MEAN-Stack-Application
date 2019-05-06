const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require("../models/user");


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
});

router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));
/*
* TODO: callback should redirect to the 'https://localhost:4200/profile'.
* */
router.get('/auth/oauth2callback', passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {

      console.log("IN SERVER OAUTH CALLBACK", req.user);
      return res.redirect('/profile/?' + req.user._id);
      // return res.redirect('https://localhost:4200/profile');
    });

router.get('/profile', function(req, res) {
  res.send(req.user);
});

router.get('/auth/logout', function(req, res) {
  req.logout();
  req.flash("success", "LOGGED YOU OUT!");
  res.redirect('/');
});

module.exports = router;
