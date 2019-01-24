const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs"); // For hash pw
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load user model
const User = require("../../models/User");

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  // Body needs body-parser bringed in server.js
  User.findOne({ email: req.body.email }).then(user => {
    // Checking that user has the email address
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Default
      });

      const newUser = new User({
        // Passing data as a object
        name: req.body.name,
        email: req.body.email,
        avatar, // avatar: avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   GET api/users/login
// @desc    Login user / Returning JWT Token
// @access  Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }) // email: email
    .then(user => {
      // Check for user
      if (!user) {
        return res.status(404).json({ email: "User not found" });
      }

      // Check password when user is found
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched

          const payload = { id: user.id, name: user.name, avatar: user.avatar }; // Create JWT payload
          // Sign token / keys.secretOrKey is in config folder keys.js / Key expires in an hour
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          // If pw doesn't match status 400
          return res.status(400).json({ password: "Password incorrect" });
        }
      });
    });
});

module.exports = router;
