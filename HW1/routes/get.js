var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send({name: 'Xintong Hao',
        course: 'CS591 D1: MEAN app',
        method: 'GET',
        quiz: 'Which word goes before vest, beans and quartet?',
        answer: 'String' });
});

module.exports = router;
