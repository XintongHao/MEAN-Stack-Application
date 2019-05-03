const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/oauth2callback', passport.authenticate('google', {
  successRedirect: '/profile',
  failureRedirect: '/'
}));

router.get('/profile', function(req, res) {
  res.send(req.user);
  // res.send(req.user);
});

router.get('/logout', function(req, res) {
  req.logout();
  req.flash("success", "LOGGED YOU OUT!");
  res.redirect('/');
});

module.exports = router;
