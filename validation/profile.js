const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfilenInput(data) {
  let errors = {};
  // Validator only accpets strings so null or undefined is changed to empty string
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  // console.log(data.status === "0");
  data.status = !isEmpty(data.status) && data.status !== "0" ? data.status : "";

  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle needs to be between 2 and 4 characters";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is required";
  }
  // console.log(data.status);
  if (Validator.isEmpty(data.status)) {
    errors.status = "Status field is required";
    // console.log(errors);
  }

  if (Validator.isEmpty(data.skills)) {
    errors.skills = "Skills field is required";
  }
  // If the website is not empty then validator checks that the given URL is valid (Website is not required)
  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Not a valid URL";
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid URL";
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a valid URL";
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors) // is-empty.js
  };
};
