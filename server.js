const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//For authentication
const passport = require("passport");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

// Body parser middleware for accessing req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true } // For deprecation warning
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// app.get("/", (req, res) => res.send("Hello World"));
//Passport middleware
app.use(passport.initialize());

//Passport config
require("./config/passport")(passport);

// Use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// For heroku process.env.PORT
// http://localhost:5000/
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));