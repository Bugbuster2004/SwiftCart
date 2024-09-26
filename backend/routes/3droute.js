const express = require("express");
const { modelGen } = require("../controllers/3dmodelController");
const router = express.Router();

router.post("/generate3dmodel", modelGen);

module.exports = router;
