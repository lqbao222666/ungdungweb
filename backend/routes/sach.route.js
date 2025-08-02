const express = require("express");
const router = express.Router();
const controller = require("../controllers/Sach.controller.js");

// Tạo sản phẩm có hình ảnh
router.post(
  "/upload",
  controller.upload.single("HinhAnh"),
  controller.createWithImage
);
router.put("/:id", controller.upload.single("HinhAnh"), controller.updateSach);

// Tạo sản phẩm bình thường (không ảnh)
router.post("/", controller.createSach);

router.get("/", controller.getAllSach);
router.get("/:id", controller.getSachById);
router.put("/:id", controller.updateSach);
router.delete("/:id", controller.deleteSach);
router.delete("/", controller.deleteAllSach);

module.exports = router;
