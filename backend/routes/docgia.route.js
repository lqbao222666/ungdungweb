const express = require("express");
const router = express.Router();
const controller = require("../controllers/docgia.controller.js");

router.post("/", controller.createDocGia);
router.get("/", controller.getAllDocGia);
router.get("/:id", controller.getDocGiaById);
router.put("/:id", controller.updateDocGia);
router.delete("/:id", controller.deleteDocGia);
router.delete("/", controller.deleteAllDocGia);
router.post("/login", controller.loginDocGia);

module.exports = router;
