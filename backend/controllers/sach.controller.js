const SachService = require("../services/Sach.service.js");
const multer = require("multer");
const path = require("path");

// Cấu hình lưu ảnh
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Tạo sản phẩm với hình ảnh
const createWithImage = (req, res) => {
  const data = req.body;
  const file = req.file;

  if (!data.TenSach || !file) {
    return res.status(400).json({ message: "Thiếu thông tin hoặc hình ảnh!" });
  }

  data.HinhAnh = file.filename;

  SachService.create(data, (err, result) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.status(201).json({ message: "Tạo thành công", data: result });
  });
};

// Tạo sản phẩm không ảnh (dùng cho sản phẩm cũ)
const createSach = (req, res) => {
  const data = req.body;
  if (!data.TenSach || !data.DonGia || !data.MaNXB) {
    return res.status(400).json({ message: "Thiếu thông tin bắt buộc!" });
  }

  // nếu không có ảnh thì gán null
  data.HinhAnh = null;

  SachService.create(data, (err, result) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.status(201).json({ message: "Tạo thành công", data: result });
  });
};

// Các phương thức còn lại
const getAllSach = (req, res) => {
  SachService.getAll((err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.json(data);
  });
};

const getSachById = (req, res) => {
  const id = req.params.id;
  SachService.getById(id, (err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    if (!data) return res.status(404).json({ message: "Không tìm thấy sách" });
    res.json(data);
  });
};

const updateSach = (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  if (req.file) {
    updatedData.HinhAnh = req.file.filename;
  }

  SachService.update(id, updatedData, (err, result) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.json({ message: "Cập nhật thành công" });
  });
};

const deleteSach = (req, res) => {
  const id = req.params.id;
  SachService.delete(id, (err, result) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.json({ message: "Xóa thành công" });
  });
};

const deleteAllSach = (req, res) => {
  SachService.deleteAll((err, result) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.json({ message: `Đã xóa ${result.affectedRows} sách` });
  });
};

module.exports = {
  upload,
  createWithImage,
  createSach,
  getAllSach,
  getSachById,
  updateSach,
  deleteSach,
  deleteAllSach,
};
