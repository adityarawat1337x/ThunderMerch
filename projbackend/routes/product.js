const express = require("express");
const router = express.Router();

// controllers
const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  removeProduct,
  getAllProducts,
} = require("../controllers/product");
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const { create } = require("../models/user");

// params
router.param("userId", getUserById);
router.param("productId", getProductById);

// create product routes
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

// read product routes
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

// delete route
router.delete(
  "/product/delete/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeProduct
);

// list routes
router.get("/products/", getAllProducts);

module.exports = router;
