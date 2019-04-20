const validator = require("validator");

const isEmpty = require("../util/isEmpty");

module.exports = validateUserSignUpInput = data => {
  let errors = {};

  if (isEmpty(data.userName)) {
    errors.userNameIsNotValid = "userName field is required!";
  } else if (!validator.isLength(data.userName, { min: 2, max: 30 })) {
    errors.userNameIsNotValid =
      "User Name must be in between 2 and 30 characters!";
  }

  if (isEmpty(data.password)) {
    errors.passwordIsNotValid = "Password field is required!";
  } else if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.passwordIsNotValid =
      "Password must be in between 6 and 30 characters!";
  }

  if (isEmpty(data.confirmPassword)) {
    errors.confirmPasswordIsNotValid = "ConfirmPassword field is required!";
  } else if (!validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPasswordIsNotValid = "Passwords must match!";
  }

  if (!validator.isEmail(data.email)) {
    errors.emailIsNotValid = "Email is not valid!";
  }

  if (isEmpty(data.email)) {
    errors.emailIsNotValid = "Email field is required!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
