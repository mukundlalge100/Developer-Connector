const express = require("express");
const router = express.Router();
const profileController = require("../../controllers/ProfileController/ProfileController");
const passport = require("passport");

// @ROUTE   => api/profiles/experience
// METHOD   => POST
// DESC     => POST USER EXPERIENCE DETAILS ...
// ACCESS   => PRIVATE ...
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  profileController.postExperience
);

// @ROUTE   => api/profiles/education
// METHOD   => POST
// DESC     => POST USER EDUCATION DETAILS ...
// ACCESS   => PRIVATE ...
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  profileController.postEducation
);

// @ROUTE   => api/profiles/education/:educationId
// METHOD   => DELETE
// DESC     => DELETE EDUCATION DETAILS BY ITS ID...
// ACCESS   => PRIVATE ...
router.delete(
  "/education/:educationId",
  passport.authenticate("jwt", { session: false }),
  profileController.deleteEducation
);

// @ROUTE   => api/profiles/experience/:experienceId
// METHOD   => DELETE
// DESC     => DELETE EXPERIENCE DETAILS BY ITS ID ...
// ACCESS   => PRIVATE ...
router.delete(
  "/experience/:experienceId",
  passport.authenticate("jwt", { session: false }),
  profileController.deleteExperience
);

// @ROUTE   => api/profiles/all
// METHOD   => GET
// DESC     => GET USER PROFILE DETAILS ...
// ACCESS   => PRIVATE ...
router.get("/all", profileController.getProfiles);

// @ROUTE   => api/profiles
// METHOD   => GET
// DESC     => GET USER PROFILE DETAILS ...
// ACCESS   => PRIVATE ...
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileController.getProfile
);

// @ROUTE   => api/profiles
// METHOD   => GET
// DESC     => GET USER PROFILE DETAILS ...
// ACCESS   => PRIVATE ...
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileController.postProfile
);

// @ROUTE   => api/profiles
// METHOD   => DELETE
// DESC     => DELETE USER AND PROFILE BY ID...
// ACCESS   => PRIVATE ...
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileController.deleteProfileAndAccount
);
// @ROUTE   => api/profiles/handle/:handle
// METHOD   => GET
// DESC     => GET USER PROFILE DETAILS BY HANDLE ...
// ACCESS   => PRIVATE ...
router.get("/handle/:handle", profileController.getProfileByHandle);

// @ROUTE   => api/profiles/user/:userId
// METHOD   => GET
// DESC     => GET USER PROFILE DETAILS BY HANDLE ...
// ACCESS   => PRIVATE ...
router.get("/user/:userId", profileController.getProfileByUserId);
module.exports = router;
