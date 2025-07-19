const express = require("express");
const router = express.Router();
const controller = require("../controllers/Sach.controller.js");

router.post("/", controller.createSach);
router.get("/", controller.getAllSach);
router.get("/:id", controller.getSachById);
router.put("/:id", controller.updateSach);
router.delete("/:id", controller.deleteSach);
router.delete("/", controller.deleteAllSach);

module.exports = router;
