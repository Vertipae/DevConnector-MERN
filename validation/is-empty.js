// Global method for checking if the input is empty

const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) || // Checking for empty object
  (typeof value === "string" && value.trim().length === 0); // Checking for empty string

module.exports = isEmpty;
