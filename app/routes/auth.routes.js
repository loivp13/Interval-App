let router = require("express").Router();
//importing controllers
const auth = require("../controllers/auth.controller");
const {
  register,
  login,
  forgotPassword,
  activate,
  resetPassword,
  changePassword,
} = auth;

//import validator
const validators = require("./validators/auth.validators");
const {
  userRegisterValidator,
  userLoginValidator,
  userResetPasswordValidator,
  userForgotPasswordValidator,
  userUpdateValidator,
  userChangePasswordValidator,
} = validators;

const { runValidation } = require("./validators");

router.get("/", (req, res) => {
  res.json({ message: "hit" });
});

// register a new User
router.post("/", userRegisterValidator, runValidation, register);

//activate user
router.post("/activate", activate);

//user login
router.post("/login", userLoginValidator, runValidation, login);

//User forgot pw
router.post(
  "/forgot-password",
  userForgotPasswordValidator,
  runValidation,
  forgotPassword
);
//User update
router.put(
  "/reset-password",
  userResetPasswordValidator,
  runValidation,
  resetPassword
);

router.put(
  "/change-password",
  userChangePasswordValidator,
  runValidation,
  changePassword
);
module.exports = router;
