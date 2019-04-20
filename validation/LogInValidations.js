const validator = require("validator");

const isEmpty = require("../util/isEmpty");

module.exports = validateUserLogInInput = data => {
  let errors = {};

  if (isEmpty(data.email)) {
    errors.emailIsNotValid = "Email field is required!";
  } else if (!validator.isEmail(data.email)) {
    errors.emailIsNotValid = "Email is not valid!";
  }

  if (isEmpty(data.password)) {
    errors.passwordIsNotValid = "Password field is required!";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
