const NXBService = require("../services/nxb.service");

const createNXB = (req, res) => {
  const data = req.body;
  if (!data.TenNXB || !data.DiaChi) {
    return res.status(400).json({ message: "Thiếu thông tin nhà xuất bản!" });
  }

  NXBService.create(data, (err, result) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.status(201).json({ message: "Tạo NXB thành công", data: result });
  });
};

const getAllNXB = (req, res) => {
  NXBService.getAll((err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.json(data);
  });
};

module.exports = {
  createNXB,
  getAllNXB,
};
