var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
    var name=req.body.name;
    var method=req.body.method;
    console.log("POST name = "+name+", method is "+method);
    res.send({
        keys: 'name, method',
        name: name,
       method: method});
});

module.exports = router;
