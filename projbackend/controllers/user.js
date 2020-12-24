const User = require("../models/user");
const Order = require("../models/order");

const crypto = require("crypto");
const { v1: uuidv1 } = require("uuid");

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

exports.updateUser = (req, res) => {
  if (req.body.password) {
    req.body.salt = uuidv1();
    req.body.encryptedPassword = crypto
      .createHmac("sha256", req.body.salt)
      .update(req.body.password)
      .digest("hex");
  }

  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, userObj) => {
      if (err || !userObj) {
        res.status(400).json({ Error: "Update failed" });
      }
      userObj.salt = userObj.encryptedPassword = userObj.createdAt = userObj.updatedAt = undefined;
      res.json({ userObj });
    }
  );
};

exports.userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((err, orderObj) => {
      if (err) {
        return res.status(400).json({ Error: "No order" });
      }
      return res.json(orderObj);
    });
};

exports.pushOrderInPurchaseList = (req, res, next) => {
  const purchases = [];
  req.body.order.products.forEach((product) => {
    purchases.push({
      ..._product,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id,
    });
  });
  //storing in databse
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true, useFindAndModify: false },
    (err, purchaseObj) => {
      if (err) {
        return res.status(400).json({ Error: "Unable to save purchases" });
      }
      console.log(purchaseObj);
      next();
    }
  );
};
