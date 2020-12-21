const { randomBytes, randomInt } = require("crypto");
const express = require("express");
const app = express();
let middleware = randomInt(2);

const middle1 = (req, res, next) => {
  if (middleware) {
    console.log("middleware 1 check");
    middleware = randomInt(2);
    next();
  } else {
    console.log("middleware 1 not ok");
  }
};

const middle2 = (req, res, next) => {
  if (middleware) {
    console.log("middleware 2 check");
    next();
  } else {
    console.log("middleware 2 not ok");
  }
};

app.get("/", middle1, middle2, (req, res) => {
  return res.send("HEY THIS IS DASHBOARD");
});

app.listen(3000, () => {
  console.log("Server Running...");
});
