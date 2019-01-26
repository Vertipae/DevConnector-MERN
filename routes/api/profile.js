const express = require("express");
const router = express.Router();
// For database
const mongoose = require("mongoose");
// For protective routes
const passport = require("passport");

// Load profile model
const Profile = require("../../models/Profile");
// Load user profile
const User = require("../../models/User");

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    // Finding the user from Profile
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Checking that there is the actual profile
        if (!profile) {
          // If not profile return 404 status
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        // If there is then everything is k and status 200
        res.json(profile);
      }) // If something still goes wrong with the findOne then it gives generated error
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
