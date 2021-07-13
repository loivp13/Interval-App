const db = require("../models");
const Op = db.Sequelize.Op;
const User = db.users;
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.updateTimer = (req, res) => {
  let { token, timers } = req.body;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        error: "Token has expired.",
      });
    }
  });
  const { userId } = jwt.decode(token);
  User.findOne({
    where: {
      userId,
    },
  }).then((user) => {
    if (!user) {
      return res.status(400).json({
        message: "Timer controller: updating timer failed.",
      });
    }
    user.update({
      timers,
    });
    console.log(user.password);
    res.json({ message: "Update successful" });
  });
};
