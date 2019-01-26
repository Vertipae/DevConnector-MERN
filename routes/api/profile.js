// Awesome profile route
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

// @route   POST api/profile
// @desc    Create or Edit user profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id; // Includes avatar, name and email
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    // Skills - split into array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(","); // Awesome splitting
    }

    // Social (is in its own object in Profile.js and has object of fields)
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }) // Finds logged in user
      .then(profile => {
        // If profile exists
        if (profile) {
          // Update
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          ) // Determines what user to update
            .then(profile => res.json(profile));
        } else {
          // Create
          // Check if handle exists
          Profile.findOne({ handle: profileFields.handle }).then(profile => {
            // If profile exists with that handle then it sends an error
            if (profile) {
              errors.handle = "That handle already exists";
              res.status(400).json(errors);
            }
            // If there isn't a profile with that handle then it saves a profile
            new Profile(profileFields)
              .save()
              .then(profile => res.json(profile));
          });
        }
      });
  }
);

module.exports = router;
