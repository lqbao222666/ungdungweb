const express = require("express");
const router = express.Router();
const controller = require("../controllers/muonsach.controller.js");

router.post("/", controller.muonSach);
router.get("/", controller.getAll);
router.get("/docgia/:id", controller.getByDocGia);
router.put("/tra", controller.traSach);
router.delete("/:docgia/:sach/:ngaymuon", controller.deleteMuon);

module.exports = router;
