/*
 * Created by Xintong Hao on 3/25/19 12:07 AM.
 * Copyright (c) 2019.
 */
require('es6-promise').polyfill();
require('isomorphic-fetch');
const express = require('express');
const router = express.Router();
const md5 = require('md5');
const lineReader = require('line-reader');
const Promise = require('bluebird');

/* Render to search form */
router.get('/', function(req, res){
    res.render('search.pug');
});


/* GET characters listing. */
router.get('/marvel', function(req, res) {
    console.log("=======================");
    var character = req.query.character;
    console.log(`Query Character : ${character}`);
    console.log("=======================");
    // Reading API keys
    var eachLine = Promise.promisify(lineReader.eachLine);
    var keys = [];
    const ts = 1;
    eachLine('keys.txt', function(line) {
        keys.push(line);

    }).then(function() {
        const APIKEY = keys[0];
        const HASH = md5(ts.toString() + keys[1] + keys[0]);
        console.log('Reading keys done');
        console.log("=======================");
        // Send Request!
        const url = 'https://gateway.marvel.com:443/v1/public/characters?name=' + character + '&ts=' + ts + '&apikey=' + APIKEY + '&hash=' + HASH;

        let promise = fetch(url, {
            headers: new Headers({
                'accept': '*/*'
            })
        })
            .then(response => response.json())
            .then(data => {
                if(data.data.results[0]){
                    // console.log(data.data.results[0]);
                    res.render('marvel.pug', {data: data.data.results[0]});
                }
                else{
                    res.send("Character Unavailable! Check the Character's Name.");
                }
            })
            .catch(error => console.error(error));
    }).catch(function(err) {
        console.error(err);
    });
});

module.exports = router;


