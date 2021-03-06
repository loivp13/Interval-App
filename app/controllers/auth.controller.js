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
  const { signup_username, signup_password, signup_email } = req.body;
  User.findOne({
    where: {
      email: {
        [Op.iLike]: signup_email,
      },
    },
  }).then((data) => {
    //if data exist email or username is taking
    if (data) {
      console.log(data);
      res.status(400).json({
        message: "Email is already taken",
      });
    }

    //if data does not exist send double optin email
    const token = jwt.sign(
      {
        signup_password,
        signup_username,
        signup_email,
      },
      process.env.JWT_ACCOUNT_ACTIVATION
    );
    //send email returning a promise
    const sendEmailOnRegister = ses
      .sendEmail(registerEmailParams(signup_email, token))
      .promise();
    //
    sendEmailOnRegister
      .then((data) => {
        res.json({
          message: `Email has been sent to  ${signup_email}. Follow the instructions to complete your registration.`,
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

  const { signup_username, signup_password, signup_email } = jwt.decode(token);

  //check if another email was registered
  User.findOne({
    where: {
      email: {
        [Op.iLike]: signup_email,
      },
    },
  }).then((data) => {
    if (data) {
      res.status(401).json({
        error: "Email was just taken",
      });
    }
  });

  //create new user
  User.create({
    username: signup_username,
    password: signup_password,
    email: signup_email,
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
  const { login_email, login_password } = req.body;
  User.findOne({ where: { email: { [Op.iLike]: login_email } } })
    .then(async (data) => {
      //No user was found
      if (!data) {
        return res.status(400).json({
          message: "Unable to login. Email or password is incorrect",
        });
      }

      //found user validate password
      if (!(await data.validatePassword(login_password))) {
        return res
          .status(401)
          .json({ message: "Unable to login. Email or password is incorrect" });
      }
      //generate JWT and send to client
      const token = jwt.sign({ userId: data.userId }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      const { email, firstName, lastName, username, timers } = data;
      return res.json({
        token,
        email,
        username,
        timers,
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
  const { forgot_email } = req.body;
  console.log(forgot_email);
  User.findOne({ where: { email: { [Op.iLike]: forgot_email } } })
    .then((data) => {
      //no user found
      if (!data) {
        return res.status(400).json({
          message: "We could not verify your email. Please try again",
        });
      }
      //found user
      console.log(data.fullName);
      const token = jwt.sign(
        { name: data.fullName },
        process.env.JWT_RESET_PASSWORD,
        {
          expiresIn: "10min",
        }
      );
      User.update({ resetToken: token }, { where: { email: forgot_email } })
        .then((data) => {
          const sendEmail = ses
            .sendEmail(forgotEmailPasswordParams(forgot_email, token))
            .promise();

          sendEmail
            .then((data) => {
              return res.json({
                message: `Email has been sent to ${forgot_email}. Please follow the email's instructions to reset your password. The link will expire in 10 minutes.`,
              });
            })
            .catch((error) => {
              res.json({
                message: "An error was detected, please try again",
                error: error,
              });
            });
        })
        .catch((err) => {
          res.status(400).json({
            message: "Unable to reset your password, please try again.",
            err: err,
          });
        });
    })
    .catch((err) => {
      res.status(400).json({
        message:
          "Unable to reset your password at this time. Please try again.",
        err,
      });
    });
};

exports.resetPassword = (req, res) => {
  const { new_password, token } = req.body;
  console.log(new_password);
  User.findOne({ where: { resetToken: token } })
    .then((data) => {
      if (!data) {
        return res.status(400).json({
          message: "No reset token found. Please try again",
        });
      }
      data
        .update(
          {
            password: new_password,
          },
          { where: { resetToken: token } }
        )
        .then((data) => {
          res.status(200).json({
            message: "Password successfully reset",
          });
        })
        .catch((err) => {
          res.status(400).json({
            message:
              "An error occured while resetting password. Please try again.",
            err,
          });
        });
    })
    .catch((err) => {
      res.status(400).json({
        message: "An error occured while resetting password. Please try again",
        err,
      });
    });
};

exports.changePassword = (req, res) => {
  const { new_password, current_password, changePw_email } = req.body;
  User.findOne({ where: { email: { [Op.iLike]: changePw_email } } }).then(
    async (data) => {
      let isPwValid = await data.validatePassword(current_password);
      if (!isPwValid) {
        return res.status(400).json({
          message: "Password is incorrect. Please try again.",
        });
      }
      data
        .update({ password: new_password })
        .then((data) => {
          return res.json({
            message: "Password has been changed",
          });
        })
        .catch(() => {
          return res.status(500).json({
            message: "An error occur while updated",
          });
        });
    }
  );
};

exports.deleteUserAccount = (req, res) => {
  const { delete_email, current_password } = req.body;
  User.findOne({ where: { email: { [Op.iLike]: delete_email } } }).then(
    async (data) => {
      let isPwValid = await data.validatePassword(current_password);
      if (!isPwValid) {
        return res.status(400).json({
          message: "Password is incorrect. Please try again",
        });
      }
      data
        .destroy()
        .then((data) => {
          return res.json({
            message: "Account has been deleted",
          });
        })
        .catch((data) => {
          return res.json({
            message:
              "An error occuring while attempting to delete your account. Please try again.",
          });
        });
    }
  );
};
