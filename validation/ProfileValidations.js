const validator = require("validator");

const isEmpty = require("../util/isEmpty");

module.exports = validateProfileInput = data => {
  let errors = {};

  if (isEmpty(data.handle)) {
    errors.handleIsNotValid = "Handle field is required!";
  } else if (!validator.isLength(data.handle, { min: 4, max: 30 })) {
    errors.handleIsNotValid = "Handle must be in between 4 and 30 characters!";
  }

  if (isEmpty(data.status)) {
    errors.statusIsNotValid = "Status field is required!";
  }

  if (isEmpty(data.skills)) {
    errors.skillsAreNotValid = "Skills field is required!";
  }

  if (!isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.websiteIsNotValid = "Website has not valid URL";
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebookIsNotValid = "Facebook has not valid URL";
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitterIsNotValid = "Twitter has not valid URL";
    }
  }
  if (!isEmpty(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) {
      errors.linkedinIsNotValid = "Linkedin has not valid URL";
    }
  }
  if (!isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      errors.youtubeIsNotValid = "Youtube has not valid URL";
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!validator.isURL(data.instagram)) {
      errors.instagramIsNotValid = "Instagram has not valid URL";
    }
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
