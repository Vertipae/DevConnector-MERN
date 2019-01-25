const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // If the name isn't empty then it is going to be data.name but if it is empty then it's going to be empty string
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    // If its not between 2 and 30 it gives error
    errors.name = "Name must be between 2 and 30 characters";
  }
  // Goes to here as a empty string
  // Gives error if the name is empty
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is required";
  }
  // Validating that Password and Password 2 matches (if its not equal)
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors) // is-empty.js
  };
};
