const express = require("express");
const router = express.Router();
const userController = require("../../controllers/UserController/UserController");
const passport = require("passport");

// @ROUTE      => api/users/signup
// METHOD      => POST
// DESC        => SIGNUP USER ROUTE
// ACCESS      => PUBLIC...
router.post("/signup", userController.postSignUp);

// @ROUTE      => api/users/login
// METHOD      => POST
// DESC        => LOGIN USER ROUTE
// ACCESS      => PUBLIC...
router.post("/login", userController.postLogIn);

// @ROUTE      => api/users/current-user
// METHOD      => GET
// DESC        => GET CURENT USER INFORMATION
// ACCESS      => PRIVATE...
router.get(
  "/current-user",
  passport.authenticate("jwt", { session: false }),
  userController.getCurrentUser
);

module.exports = router;
