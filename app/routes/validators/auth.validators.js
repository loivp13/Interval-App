const { check } = require("express-validator");

exports.userRegisterValidator = [
  check("signup_email").isEmail().withMessage("Must be a valid email address"),
  check("signup_username").not().isEmpty().withMessage("Username is required"),
  check("signup_password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

exports.userLoginValidator = [
  check("login_email").isEmail().withMessage("Must be a valid email address"),
  check("login_password")
    .not()
    .isEmpty()
    .withMessage("Password cannot be empty"),
];

exports.userForgotPasswordValidator = [
  check("forgot_email").isEmail().withMessage("Must be valid email address"),
];

exports.userResetPasswordValidator = [
  check("new_password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  check("token").not().isEmpty().withMessage("Token is required"),
];

exports.userUpdateValidator = [
  check("update_email").not().isEmpty().withMessage("Name is required"),
];
