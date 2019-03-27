# Create a Simple Back-End Server

_Author: Xintong Hao_

_Email: hxtong@bu.edu_

---

[//]: # (Image References)
[image1]: ./archive/post_demo1.png "post demo1"
[image2]: ./archive/post_demo2.png "post demo2"

### Modules and pacakage.json

All the modoules in this project are listed in `package.json` file which is shown below:

```json{
  "name": "hw1",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www"
  },
  "dependencies": {
    "cookie-parser": "~1.4.3",
    "debug": "~2.6.9",
    "express": "~4.16.0",
    "http-errors": "~1.6.2",
    "morgan": "~1.9.0",
    "pug": "2.0.0-beta11"
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
$ node app.js
```
Then the app will listen on port 3000, where you can use URL `localhost:3000/hw1` to launch the web page.

### GET Method

First navigate to `localhost:3000/hw1/get`. This is a route using the GET method which returns a JSON object. You will see a quiz if you are lucky to reach this route!

You can also use Postman to get the response.

### POST Method

To test this route, open **Postman**, select `POST` as the method, then click the `Body` tab. Type the pair of key and value in `x-www-form-urlencoded`. For example, you can type keys "name" and "method", and enter any value you want to get the response. 

For example:

![alt text][image1]

Response:

![alt text][image2]
