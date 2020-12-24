const express = require("express");

const router = express.Router();
const { signup, signout, signin, isSignedIn } = require("../controllers/auth");
const { check } = require("express-validator");

router.post(
  "/signup",
  // checking email password will be validated in controller
  [
    check("email").isEmail().withMessage("Not a valid Email"),
    check("password", "Min password length should be 8, Alphanumeric")
      .isAlphanumeric()
      .isLength({ min: 8 }),
  ],
  // route continue
  signup
);

router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("Not a valid Email"),
    check("password", "Min password length should be 8, Alphanumeric")
      .isAlphanumeric()
      .isLength({ min: 8 }),
  ],
  signin
);

router.get("/signout", signout);

router.get("/testroute", isSignedIn, (req, res) => {
  res.json({ "Protected Route": req.auth });
});

module.exports = router;
