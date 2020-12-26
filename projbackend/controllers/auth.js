const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
require("dotenv").config();

// checking validation errors
const validator = function (req, res) {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(422).json({
      Errors: error.errors.map((error) => {
        return { Error: error.param, Err: error.msg };
      }),
    });
  }
  // done checking
  return false;
};

// signup control
exports.signup = (req, res) => {
  // check validation
  validator(req, res);
  // user database creating
  const user = new User(req.body);

  user.save((err, userObj) => {
    // error checking
    if (err)
      return res.status(400).json({
        Rrror: "Not able to save user in db",
        Err: err,
      });
    console.log(userObj);
    return res.json(`${userObj.firstname} database created`);
  });
};

// signout control
exports.signout = (req, res) => {
  res.clearCookie("token");
  return res.send("User signed out success");
};

// delete control
exports.del = (req, res) => {
  return res.send("DATA DELETED");
};

// signin control
exports.signin = (req, res) => {
  // check validation
  validator(req, res);
  const { email, password } = req.body;

  // checking Database for email and password
  User.findOne({ email }, (err, userObj) => {
    if (err || !userObj) {
      return res.status(400).json({
        Error: "User email not found",
        Err: err,
      });
    }
    if (!userObj.authenticate(password)) {
      return res.status(401).json({
        Error: "Wrong Password",
        Err: err,
      });
    }

    // creating token
    const token = jwt.sign(
      { _id: userObj._id, algorithm: ["HS256"] },
      process.env.SECRET
    );

    // putting token to cookie
    res.cookie("token", token, { expire: new Date() * 60 * 60 });

    // response to frontend
    const { _id, firstname, email, role } = userObj;
    return res.json({ token, user: { _id, firstname, email, role } });
  });
};

// protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

// custom middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker)
    return res.status(403).json({ Error: "Access Denied not Authenticated" });
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0)
    res.status(403).json({ Error: "You are not Admin" });
  next();
};
