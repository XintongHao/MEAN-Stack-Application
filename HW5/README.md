# HW5

This project is to use NodeJS as backend server and AngularCLI as  frontend client. This app allow you to login with your Google account and it will store your basic profile (googleID, username, email) in the mongoDB. 

---

[//]: # (Image References)
[image1]: ./demo/homepage.png "homepage"
[image2]: ./demo/googleSignin.png "googleSignin"
[image3]: ./demo/googleProfile.png "homepage"

## MongoDB Connection

Run `mongo` to start mongoDB connection. The default server will be `mongodb://localhost:27017/HW5`

## Backend Server
Run `node bin/www` in the directory of `HW5/server`. It will start the backend server on port 3000.

## Frontend Server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Home Page

Go to `http://localhost:4200/` and you will visit the homepage of the application.

![alt text][image1]

The `Google Login` button allows you to login as a google user.

![alt text][image2]

Then the backend server would store your google profile in the mongoDB database.

![alt text][image3]

Then it would add your profile in the user list which is shown in the home page.

![alt text][image1]