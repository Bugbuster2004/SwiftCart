const express = require("express");
const {
  registerController,
  test,
  forgotPasswordController,
  getOrdersController,
} = require("../controllers/authController");
const { loginController } = require("../controllers/authController");
const { requireSignIn, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

//routings
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/test", requireSignIn, isAdmin, test);
router.post("/forgot-password", forgotPasswordController);
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/orders", requireSignIn, getOrdersController);

module.exports = router;
