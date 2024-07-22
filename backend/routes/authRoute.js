const express = require("express");
const { registerController, test } = require("../controllers/authController");
const { loginController } = require("../controllers/authController");
const { requireSignIn, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

//routings
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/test", requireSignIn, isAdmin, test);

module.exports = router;
