const isEmpty = value =>
  value === undefined ||
  value === null ||
  value === 0 ||
  (typeof value === "object" && Object.keys(value).length === 0) || // Checking for empty object
  (typeof value === "string" && value.trim().length === 0); // Checking for empty string

export default isEmpty;
