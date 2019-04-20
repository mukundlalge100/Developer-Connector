const validator = require("validator");

const isEmpty = require("../util/isEmpty");

module.exports = validatePostInput = data => {
  let errors = {};

  if (isEmpty(data.text)) {
    errors.textIsNotValid = "Text Field is required!";
  } else if (!validator.isLength(data.text, { min: 10, max: 500 })) {
    errors.textIsNotValid = "Post must be between 10 to 500 characters!!";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
