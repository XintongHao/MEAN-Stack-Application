# Working with External Data (API)

_Author: Xintong Hao_

_Email: hxtong@bu.edu_

---

[//]: # (Image References)
[image1]: ./Demo/landing.png "landing"
[image2]: ./Demo/trump.png "trump"
[image3]: ./Demo/search.png "search"
[image4]: ./Demo/result.png "result"

### Modules and pacakage.json

All the modoules in this project are listed in `package.json` file which is shown below:

```json{
{
  "name": "hw3",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www"
  },
  "dependencies": {
    "bluebird": "^3.5.3",
    "bootstrap": "^4.3.1",
    "cookie-parser": "~1.4.3",
    "debug": "~2.6.9",
    "es6-promise": "^4.2.6",
    "express": "~4.16.0",
    "http-errors": "~1.6.2",
    "isomorphic-fetch": "^2.2.1",
    "line-reader": "^0.4.0",
    "morgan": "~1.9.0",
    "pug": "2.0.0-beta11",
    "request": "^2.88.0"
  }
}
```

To install all dependencies:

```sh
$ npm install 
```

### Landing Web Page

Go to the terminal of the project and type the following command to run the app.

```sh
$ node bin/www
```
Then the app will listen on port 3000, where you can use URL `localhost:3000` to launch the web page.

The landing Page should be like this:

![alt text][image1]


### Get Trump's Quotes!

API: [Tronald Dump](https://www.tronalddump.io/)

Now let's get some fun! Click on the "Trump's Meme" button and you will navigate to the `localhost:3000/hw3` page. Check the random greeting from Trump!

![alt text][image2]


### Get Marvel's Character

API: [Marvel](https://developer.marvel.com/)

> If you wanna run the app by yourself, first register as a developer and get your public key and private key. Store them in a text file in the root directory of `API` called `keys.txt`, the first line is your public key, the second line is your private key.


You can also click on "Marvel's Character" button and navigate to a search page. Enter any Marvel's character you like in the search box and check the result!

![alt text][image3]

**TaDah!** This is my favourate character **THOR**!!

![alt text][image4]
