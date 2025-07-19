const SachService = require("../services/Sach.service.js");

const createSach = (req, res) => {
  const data = req.body;
  if (!data.TenSach || !data.DonGia || !data.MaNXB) {
    return res.status(400).json({ message: "Thiếu thông tin bắt buộc!" });
  }

  SachService.create(data, (err, result) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.status(201).json({ message: "Tạo thành công", data: result });
  });
};
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
  createSach,
  getAllSach,
  getSachById,
  updateSach,
  deleteSach,
  deleteAllSach,
};
