const express = require("express");
const router = express.Router();
const controller = require("../controllers/nhanvien.controller");

router.post("/", controller.createNhanVien);
router.post("/login", controller.login);
router.get("/", controller.getAllNhanVien); // test

module.exports = router;
