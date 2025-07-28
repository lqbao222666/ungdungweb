const express = require("express");
const router = express.Router();
const controller = require("../controllers/nxb.controller");

router.post("/", controller.createNXB);
router.get("/", controller.getAllNXB);

module.exports = router;
