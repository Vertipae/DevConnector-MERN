## Developer Connector

This application is implemented with Node.js, Express, React and MongoDB. Application also uses Github API for repository listing.

With this application you can be social with other developers by creating a profile and posts which you can comment and like.

https://awesomedevconnector.herokuapp.com/

Brad Traversy Udemy course "MERN Stack Front To Back: Full Stack React, Redux & Node.js"

### Development Environment:

1. Make a new file called keys_dev.js inside folder called /config

```
module.exports = {
mongoURI: "mongodb://<dbuser>:<dbpassword>@ds12345.mlab.com:12345/devconnector",
secretOrKey: "This is for JSON web token",
react_app_clientId: "", //  Github register a new OAuth application and add clientId in here
react_app_clientSecret: "" // Github register a new OAuth application and add clientSecret in here
}
```

2. Go to your terminal and run the following command:

```
npm install
```

```
npm run dev
```

Navigate to http://localhost:3000/
