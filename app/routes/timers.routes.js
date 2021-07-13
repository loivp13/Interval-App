let router = require("express").Router();

const timer = require("../controllers/timers.controller");
const { updateTimer } = timer;

const validators = require("./validators/timer.validator");
const { updateTimerValidator } = validators;
const { runValidation } = require("./validators");

router.put("/", updateTimerValidator, runValidation, updateTimer);

module.exports = router;
