const DocGiaService = require("../services/docgia.service.js");

const createDocGia = (req, res) => {
  const newDocGia = req.body;
  if (
    !newDocGia.HoLot ||
    !newDocGia.Ten ||
    !newDocGia.NgaySinh ||
    !newDocGia.Phai
  ) {
    return res.status(400).json({ message: "Thiếu thông tin bắt buộc!" });
  }

  DocGiaService.create(newDocGia, (err, result) => {
    if (err) {
      console.err("Lỗi tạo đọc giả", err);
      return res.status(500).json({ message: "Lỗi server" });
    }
    res.status(201).json({ message: "Tạo thành công", data: result });
  });
};
const getAllDocGia = (req, res) => {
  DocGiaService.getAll((err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.json(data);
  });
};

const getDocGiaById = (req, res) => {
  const id = req.params.id;
  DocGiaService.getById(id, (err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    if (!data)
      return res.status(404).json({ message: "Không tìm thấy độc giả" });
    res.json(data);
  });
};

const updateDocGia = (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  DocGiaService.update(id, updatedData, (err, result) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.json({ message: "Cập nhật thành công" });
  });
};

const deleteDocGia = (req, res) => {
  const id = req.params.id;
  DocGiaService.delete(id, (err, result) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.json({ message: "Xóa thành công" });
  });
};
const deleteAllDocGia = (req, res) => {
  DocGiaService.deleteAll((err, result) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.json({ message: `Đã xóa ${result.affectedRows} độc giả` });
  });
};

module.exports = {
  createDocGia,
  getAllDocGia,
  getDocGiaById,
  updateDocGia,
  deleteDocGia,
  deleteAllDocGia,
};
