require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// auth routes
const authRoutes = require("./routes/auth");

// user routes
const userRoutes = require("./routes/user");

//DATABSE
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DATABASE CONNECTED SUCCESSFULLY");
  })
  .catch((e) => {
    console.log(e);
  });

//MIDDLEWARE
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//ROUTES
app.use("/api", authRoutes);
app.use("/api", userRoutes);
//PORT
const port = process.env.PORT;

//SERVERrobr
app.listen(port, () => {
  console.log(`RUNNING AT PORT:${port}`);
});
