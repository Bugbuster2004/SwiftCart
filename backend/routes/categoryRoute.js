const express = require("express");
const { requireSignIn, isAdmin } = require("../middleware/authMiddleware");
const {
  createCategoryController,
  updateCategoryController,
  categoryControlller,
  singleCategoryController,
  deleteCategoryController,
} = require("../controllers/categoryController");
const router = express.Router();

router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//update category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//getALl category
router.get("/get-category", categoryControlller);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);
module.exports = router;
