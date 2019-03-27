const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',
      { title: 'Fun API APP',
      author: 'Xintong Hao'});
});

module.exports = router;
