const { check } = require("express-validator");

exports.updateTimerValidator = [
  check("token")
    .not()
    .isEmpty()
    .withMessage("UpdateTimerValidator: token is empty"),
];
