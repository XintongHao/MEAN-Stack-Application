# HW4

This application is to use Angular as a front end to develop a same API app in HW3.

---

[//]: # (Image References)
[image1]: ./Demo/hero_list.png "hero_list.png"
[image2]: ./Demo/user_dashboard.png "user_dashboard.png"
[image3]: ./Demo/get_description.png "get_description.png"
[image4]: ./Demo/get_description2.png "get_description2.png"
[image5]: ./Demo/add_user2.png "add_user2.png"
[image6]: ./Demo/get_description_newUser.png "get_description_newUser.png"
[image7]: ./Demo/search.png "search.png"

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Modules and pacakage.json

All the modoules in this project are listed in `package.json` file.

To install all dependencies:

```sh
$ npm install 
```

### User List Page

![alt text][image2]

User data structure:

```json
{
	id: number,
	user: string,
	hero: string
}

```

Users can search heroes which are in the database. For example:

![alt text][image7]


### Hero List Page

![alt text][image1]

You can add or delete any users with their heroes. For example, you can add a hero with user name and hero name:

![alt text][image5]

### Get Hero Information

Click on the hero in the hero list. You will enter a hero information page.

For example, Jimmy's hero page is shown below:

![alt text][image3]

Click on `GET Description` button, it will show the hero's description from HW3 API.

(P.S. HW3 API uses the [Marvel](https://developer.marvel.com/) external API)


You can also edit your hero in the `Hero` box. For example, you can edit Jimmy's hero from "Iron Man" to "Thor"

![alt text][image4]
