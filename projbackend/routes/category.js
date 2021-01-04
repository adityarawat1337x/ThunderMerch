const express = require("express");
const router = express.Router();

const {
  getCategoryById,
  createCategory,
  updateCategory,
  removeCategory,
  getAllUniqueCategories,
} = require("../controllers/category");

const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

// params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

// read route
router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

// update route
router.put(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

// delete route
router.delete(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeCategory
);

// get all unique categories
router.get("/categories", getAllUniqueCategories);

module.exports = router;
