/*
 * Created by Xintong Hao on 3/24/19 3:00 PM.
 * Copyright (c) 2019.
 */
require('es6-promise').polyfill();
require('isomorphic-fetch');
const express = require('express');
const router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
    let promise = fetch('https://api.tronalddump.io/random/quote', {
        headers: new Headers({
            'accept': 'application/hal+json'
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            res.render('trump.pug', {data: data});
        })
        .catch(error => console.error(error));
});

module.exports = router;
