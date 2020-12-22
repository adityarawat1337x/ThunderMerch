const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((error, userObj) => {
    if (error || !userObj) {
      return res.status(400).json({ Error: "No user found" });
    }
    req.profile = userObj;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = req.profile.encryptedPassword = req.profile.createdAt = req.profile.updatedAt = undefined;
  return res.json(req.profile);
};
