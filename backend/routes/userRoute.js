const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");

router.get("/getprofile", userController.getUserProfile);
router.get("/getuser", userController.getAllUsers);

module.exports = router;
