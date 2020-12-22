const express = require("express");

const router = express.Router();
const {
  signup,
  signout,
  del,
  signin,
  isSignedIn,
} = require("../controllers/auth");
const { check } = require("express-validator");

router.delete("/delete", del);

router.post(
  "/signup",
  // checking email password will be validated in controller
  [
    check("email").isEmail().withMessage("Not a valid Email"),
    check("password", "Min password length should be 8, Alphanumeric")
      .isLength({ min: 8 })
      .isAlphanumeric(),
  ],
  // route continue
  signup
);

router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("Not a valid Email"),
    check("password", "Min password length should be 8, Alphanumeric")
      .isLength({ min: 8 })
      .isAlphanumeric(),
  ],
  signin
);

router.get("/signout", signout);

router.get("/testroute", isSignedIn, (req, res) => {
  res.json({ "Protected Route": req.auth });
});

module.exports = router;
