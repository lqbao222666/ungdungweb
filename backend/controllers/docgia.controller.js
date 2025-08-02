const DocGiaService = require("../services/docgia.service.js");
const db = require("../config/db");
const bcrypt = require("bcrypt");

const createDocGia = (req, res) => {
  const data = req.body;
  const requiredFields = [
    "HoLot",
    "Ten",
    "NgaySinh",
    "Phai",
    "Username",
    "Password",
  ];

  for (let field of requiredFields) {
    if (!data[field]) {
      return res.status(400).json({ message: `Thiếu thông tin: ${field}` });
    }
  }

  bcrypt.hash(data.Password, 10, (err, hash) => {
    if (err) return res.status(500).json({ message: "Lỗi mã hóa mật khẩu" });

    data.Password = hash;
    DocGiaService.create(data, (err, result) => {
      if (err)
        return res.status(500).json({ message: "Lỗi server", error: err });
      res
        .status(201)
        .json({ message: "Tạo tài khoản thành công", data: result });
    });
  });
};

const getAllDocGia = (req, res) => {
  DocGiaService.getAll((err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.json(data);
  });
};

const loginDocGia = (req, res) => {
  const { Username, Password } = req.body;
  if (!Username || !Password) {
    return res.status(400).json({ message: "Thiếu thông tin đăng nhập" });
  }

  const sql = "SELECT * FROM DocGia WHERE Username = ?";
  db.query(sql, [Username], (err, results) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });

    if (results.length === 0) {
      return res.status(401).json({ message: "Sai tên đăng nhập" });
    }

    const user = results[0];

    bcrypt.compare(Password, user.Password, (err, result) => {
      if (err) return res.status(500).json({ message: "Lỗi so sánh mật khẩu" });

      if (!result) {
        return res.status(401).json({ message: "Sai mật khẩu" });
      }

      // Thành công
      res.json({ message: "Đăng nhập thành công", user });
    });
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
  loginDocGia,
  getAllDocGia,
  getDocGiaById,
  updateDocGia,
  deleteDocGia,
  deleteAllDocGia,
};
