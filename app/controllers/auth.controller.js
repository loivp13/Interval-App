const db = require("../models");
const Op = db.Sequelize.Op;
const User = db.users;
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const {
  registerEmailParams,
  forgotEmailPasswordParams,
} = require("../helpers/aws-email.helper");
const AWS = require("aws-sdk");

//config aws
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

//aws simple email service
const ses = new AWS.SES({ apiVersion: "2010-12-1" });

exports.register = (req, res) => {
  const { firstName, lastName, username, password, email } = req.body;
  User.findOne({
    where: {
      email,
    },
  }).then((data) => {
    //if data exist email or username is taking
    if (data) {
      console.log(data);
      res.status(400).json({
        message: "email or password is already taken",
      });
    }

    //if data does not exist send double optin email
    const token = jwt.sign(
      { firstName, lastName, username, password, email },
      process.env.JWT_ACCOUNT_ACTIVATION
    );
    //send email returning a promise
    const sendEmailOnRegister = ses
      .sendEmail(registerEmailParams(email, token))
      .promise();
    //
    sendEmailOnRegister
      .then((data) => {
        res.json({
          message: `Email has been sent to  ${email}. Follow the instructions to complete your registration.`,
          data,
        });
      })
      .catch((error) => {
        res.json({
          message: `We could not verify your email, please try again`,
          error,
        });
      });
  });
};

exports.activate = (req, res) => {
  const { token } = req.body;
  jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
    if (err) {
      console.log(err);
      return status(401).json({
        error: "Expired link. Try again",
      });
    }
  });

  const { firstName, lastName, email, password, username } = jwt.decode(token);

  //check if another email was registered
  User.findOne({ where: { email } }).then((data) => {
    if (data) {
      res.status(401).json({
        error: "Email was just taken",
      });
    }
  });

  //create new user
  User.create({
    username,
    firstName,
    lastName,
    password,
    email,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message ||
          "An error occurred while creating account. Please try again.",
      });
    });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ where: { email } })
    .then(async (data) => {
      //No user was found
      if (!data) {
        return res.status(401).json({
          message: "Unable to login. Email or password is incorrect",
        });
      }

      //found user validate password
      if (!(await data.validatePassword(password))) {
        console.log("end");
        return res
          .status(401)
          .json({ message: "Unable to login. Email or password is incorrect" });
      }
      //generate JWT and send to client
      const token = jwt.sign({ userId: data.userId }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      const { email, firstName, lastName, username } = data;
      return res.json({
        token,
        user: { email, firstName, lastName, username },
      });
    })
    .catch((err) => {
      if (err.errors) {
        res.json({
          message: err.errors[0].message,
        });
      } else {
        res.json({
          err: err,
        });
      }
    });
};
exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["sha1", "RS256", "HS256"],
});

exports.forgotPassword = (req, res) => {
  const { password, email } = req.body;
  User.findOne({ where: { email } });
};
