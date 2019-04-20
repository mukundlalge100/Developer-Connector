const Profile = require("../../models/Profile");
const User = require("../../models/User");

const validateProfileInput = require("../../validation/ProfileValidations");
const validateExperienceInput = require("../../validation/ExperienceValidations");
const validateEducationInput = require("../../validation/EducationValidations");
// GET PROFILE INFORMATION ...
exports.getProfiles = async (request, response, next) => {
  try {
    const profiles = await Profile.find()
      .sort("handle")
      .populate("userId", ["userName", "avatar"]);
    let errors = {};
    if (!profiles) {
      errors.noProfilesFound = "No profiles found!!";
      response.status(404).json(errors);
    }
    response.status(200).json(profiles);
  } catch (error) {
    response.status(404).json(error);
  }
};

// GET PROFILE INFORMATION ...
exports.getProfile = async (request, response, next) => {
  try {
    const profile = await Profile.findOne({
      userId: request.user._id
    }).populate("userId", ["userName", "avatar"]);
    let errors = {};
    if (!profile) {
      errors.noProfileFound = "No profile found with this user!!";
      response.status(404).json(errors);
    }
    response.status(200).json(profile);
  } catch (error) {
    response.status(404).json(error);
  }
};

// GET PROFILE INFORMATION BY ITS HANDLE...
exports.getProfileByHandle = async (request, response, next) => {
  let errors = {};
  try {
    const handle = request.params.handle;
    const profile = await Profile.findOne({
      handle: handle
    }).populate("userId", ["userName", "avatar"]);

    if (!profile) {
      errors.noProfileFound = "No profile found with this handle!!";
      response.status(404).json(errors);
    }
    response.status(200).json(profile);
  } catch (error) {
    console.log(error);
    errors.noProfileFound = "No profile found with this handle!!";
    response.status(404).json(errors);
  }
};

// GET PROFILE INFORMATION BY ITS USERID...
exports.getProfileByUserId = async (request, response, next) => {
  let errors = {};
  try {
    const userId = request.params.userId;
    const profile = await Profile.findOne({
      userId: userId
    }).populate("userId", ["userName", "avatar"]);

    if (!profile) {
      errors.noProfileFound = "No profile found with this userId!!";
      response.status(404).json(errors);
    }
    response.status(200).json(profile);
  } catch (error) {
    errors.message = error.message;
    errors.noProfileFound = "No profile found with this userId!!";
    response.status(404).json(errors);
  }
};

// POST PROFILE ROUTE RESPONSIBLE FOR CREATING OR EDITING PROFILE ...
exports.postProfile = async (request, response, next) => {
  try {
    // CHECK VALIDATIONS BEFORE SAVING PROFILE ...
    const { errors, isValid } = validateProfileInput(request.body);

    if (!isValid) {
      return response.status(404).json(errors);
    }

    // GET ALL PROFILE FIELDS ...
    let profileFields = {};
    // REQUIRED FIELDS ...
    profileFields.userId = request.user._id;
    profileFields.handle = request.body.handle;
    profileFields.status = request.body.status;

    // SPLIT USER INTO ARRAY...
    if (request.body.skills) {
      profileFields.skills = request.body.skills.split(",");
    }

    // OPTIONAL FIELDS ...
    if (request.body.company) profileFields.company = request.body.company;
    if (request.body.website) profileFields.website = request.body.website;
    if (request.body.location) profileFields.location = request.body.location;
    if (request.body.bio) profileFields.bio = request.body.bio;
    if (request.body.githubUserName)
      profileFields.githubUserName = request.body.githubUserName;

    // SOCIAL LINKS...
    profileFields.social = {};
    if (request.body.youtube)
      profileFields.social.youtube = request.body.youtube;
    if (request.body.facebook)
      profileFields.social.facebook = request.body.facebook;
    if (request.body.instagram)
      profileFields.social.instagram = request.body.instagram;
    if (request.body.linkedin)
      profileFields.social.linkedin = request.body.linkedin;
    if (request.body.twitter)
      profileFields.social.twitter = request.body.twitter;

    const profile = await Profile.findOne({ userId: request.user._id });

    if (profile) {
      // UPDATE PROFILE ...
      const updatedProfile = await Profile.findOneAndUpdate(
        { userId: request.user._id },
        { $set: profileFields },
        { new: true }
      );
      response.status(200).json(updatedProfile);
    } else {
      // CREATE PROFILE ...
      let errors = {};
      // CHECK IF PROFILE HANDLER IS ALREADY EXISTS OR NOT ...
      const alreadyExistsProfile = await Profile.findOne({
        handle: profileFields.handle
      });

      if (alreadyExistsProfile) {
        errors.handleIsNotValid = "That handle is already exists!";
        return response.status(404).json(errors);
      }
      const newProfile = await new Profile(profileFields).save();
      response.status(200).json(newProfile);
    }
  } catch (error) {
    response.status(404).json(error);
  }
};

// POST EXPERIENCE METHOD ...
exports.postExperience = async (request, response, next) => {
  // CHECK VALIDATIONS BEFORE SAVING PROFILE EXPERIENCE...
  const { errors, isValid } = validateExperienceInput(request.body);

  if (!isValid) {
    return response.status(404).json(errors);
  }

  try {
    const profile = await Profile.findOne({ userId: request.user._id });

    if (!profile) {
      errors.profileIsNotFound = "Profile is not found!";
      return response.status(404).json(errors);
    }
    const newExperience = {
      title: request.body.title,
      company: request.body.company,
      location: request.body.location,
      from: request.body.from,
      to: request.body.to,
      current: request.body.current,
      description: request.body.description
    };
    // ADD EXPERIENCE TO ARRAY ...
    profile.experience.unshift(newExperience);

    const updatedProfile = await profile.save();
    response.status(200).json(updatedProfile);
  } catch (error) {
    response.status(505).json(error);
  }
};

// POST EDUCATION METHOD ...
exports.postEducation = async (request, response, next) => {
  // CHECK VALIDATIONS BEFORE SAVING PROFILE EDUCATION...
  const { errors, isValid } = validateEducationInput(request.body);

  if (!isValid) {
    return response.status(404).json(errors);
  }

  try {
    const profile = await Profile.findOne({ userId: request.user._id });

    if (!profile) {
      errors.profileIsNotFound = "Profile is not found!";
      return response.status(404).json(errors);
    }

    const newEducation = {
      school: request.body.school,
      degree: request.body.degree,
      fieldOfStudy: request.body.fieldOfStudy,
      from: request.body.from,
      to: request.body.to,
      current: request.body.current,
      description: request.body.description
    };

    // ADD EDUCATION TO ARRAY ...
    profile.education.unshift(newEducation);

    const updatedProfile = await profile.save();
    response.status(200).json(updatedProfile);
  } catch (error) {
    response.status(505).json(error);
  }
};

// DELETE EDUCATION DETAILS BY ID METHOD ...
exports.deleteEducation = async (request, response, next) => {
  const educationId = request.params.educationId;
  try {
    const profile = await Profile.findOne({ userId: request.user._id });

    if (!profile) {
      errors.profileIsNotFound = "Profile is not found!";
      return response.status(404).json(errors);
    }
    // DELETE EDUCATION DETAILS FROM ARRAY ...
    const updatedEducation = profile.education.filter(
      edu => edu._id.toString() !== educationId.toString()
    );
    profile.education = updatedEducation;
    const updatedProfile = await profile.save();
    response.status(200).json(updatedProfile);
  } catch (error) {
    response.status(505).json(error);
  }
};

// DELETE EXPERIENCE DETAILS BY ID METHOD ...
exports.deleteExperience = async (request, response, next) => {
  const experienceId = request.params.experienceId;

  try {
    const profile = await Profile.findOne({ userId: request.user._id });

    if (!profile) {
      errors.profileIsNotFound = "Profile is not found!";
      return response.status(404).json(errors);
    }
    // DELETE EXPERIENCE DETAILS FROM ARRAY ...
    const updatedExperience = profile.experience.filter(
      exp => exp._id.toString() !== experienceId.toString()
    );
    profile.experience = updatedExperience;
    const updatedProfile = await profile.save();
    response.status(200).json(updatedProfile);
  } catch (error) {
    response.status(505).json(error);
  }
};

// DELETE PROFILE AND USER ACCOUNT BY ID METHOD ...
exports.deleteProfileAndAccount = async (request, response, next) => {
  try {
    await Profile.findOneAndDelete({
      userId: request.user._id
    });
    await User.findByIdAndDelete({ _id: request.user._id });
    response.status(200).json({
      success: true,
      message: "User account and profile deleted successfully"
    });
  } catch (error) {
    response.status(505).json(error);
  }
};
