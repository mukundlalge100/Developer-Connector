// const validator = require("validator");
const isEmpty = require("../util/isEmpty");

module.exports = validateUserExperienceInput = data => {
  let errors = {};
  if (isEmpty(data.school)) {
    errors.schoolIsNotValid = "School field is required!";
  }
  if (isEmpty(data.degree)) {
    errors.degreeIsNotValid = "Degree field is required!";
  }
  if (isEmpty(data.fieldOfStudy)) {
    errors.fieldOfStudyIsNotValid = "FieldOfStudy field is required!";
  }
  if (isEmpty(data.from)) {
    errors.fromIsNotValid = "From date field is required!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
