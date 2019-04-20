// const validator = require("validator");

const isEmpty = require("../util/isEmpty");

module.exports = validateUserExperienceInput = data => {
  let errors = {};
  if (isEmpty(data.title)) {
    errors.titleIsNotValid = "Title field is required!";
  }
  if (isEmpty(data.company)) {
    errors.companyIsNotValid = "Company field is required!";
  }
  if (isEmpty(data.from)) {
    errors.fromIsNotValid = "From date field is required!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
