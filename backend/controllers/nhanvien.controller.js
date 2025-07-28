const NhanVienService = require("../services/nhanvien.service");

const createNhanVien = (req, res) => {
  const data = req.body;
  if (!data.HoTenNV || !data.Password) {
    return res.status(400).json({ message: "Thiếu thông tin đăng ký!" });
  }

  NhanVienService.create(data, (err, result) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.status(201).json({ message: "Tạo thành công", data: result });
  });
};

const login = (req, res) => {
  const { HoTenNV, Password } = req.body;
  if (!HoTenNV || !Password) {
    return res.status(400).json({ message: "Thiếu tên hoặc mật khẩu!" });
  }

  NhanVienService.login(HoTenNV, Password, (err, user) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    if (!user) return res.status(401).json({ message: "Đăng nhập thất bại" });

    res.json({ message: "Đăng nhập thành công", nhanvien: user });
  });
};

const getAllNhanVien = (req, res) => {
  NhanVienService.getAll((err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.json(data);
  });
};

module.exports = {
  createNhanVien,
  login,
  getAllNhanVien,
};
