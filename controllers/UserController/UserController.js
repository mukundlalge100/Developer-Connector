const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const keys = require("../../config/Keys");
const validateUserSignUpInput = require("../../validation/SignUpValidations");
const validateUserLogInInput = require("../../validation/LogInValidations");

exports.postSignUp = async (request, response, next) => {
  try {
    const { errors, isValid } = validateUserSignUpInput(request.body);

    if (!isValid) {
      return response.status(400).json(errors);
    }

    const email = request.body.email;
    const userName = request.body.userName;
    const password = request.body.password;

    const user = await User.findOne({ email: email });

    if (user) {
      return response
        .status(400)
        .json({ emailIsAlreadyExist: "Email is already exists!" });
    }

    const bcryptPassword = await bcrypt.hash(password, 16);
    const avatar = await gravatar.url(email, {
      size: "200",
      rating: "pg",
      default: "mm"
    });

    const newUser = new User({
      userName: userName,
      email: email,
      password: bcryptPassword,
      avatar: avatar
    });

    const result = await newUser.save();
    response.json(result);
  } catch (error) {
    console.log(error);
    response.status(505).json(error);
  }
};
exports.postLogIn = async (request, response, next) => {
  try {
    const { errors, isValid } = validateUserLogInInput(request.body);

    if (!isValid) {
      return response.status(400).json(errors);
    }
    const password = request.body.password;
    const email = request.body.email;
    const user = await User.findOne({ email: email });
    if (!user) {
      return response.status(400).json({
        emailIsNotValid: "User is not exists,Please enter valid email address."
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return response.status(400).json({
        passwordIsNotValid:
          "Password credentials are invalid.Enter valid credentials."
      });
    }

    // PAYLOAD FOR TOKEN ...
    const payload = {
      _id: user._id,
      userName: user.userName,
      avatar: user.avatar
    };
    // JWT TOKEN AFTER SIGN IN ...
    const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: "2h" });
    response.json({ success: true, token: "Bearer " + token });
  } catch (error) {
    console.log(error);
    response.status(505).json(error);
  }
};

exports.getCurrentUser = (request, response, next) => {
  response.json({
    user: {
      id: request.user.id,
      userName: request.user.userName,
      email: request.user.email
    }
  });
};
