const db = require("../config/db.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const DocGiaService = require("../services/docgia.service.js");

const createDocGia = (req, res) => {
  const newDocGia = req.body;

  if (
    !newDocGia.HoLot ||
    !newDocGia.Ten ||
    !newDocGia.NgaySinh ||
    !newDocGia.Phai ||
    !newDocGia.Username ||
    !newDocGia.Password
  ) {
    return res.status(400).json({ message: "Thiếu thông tin bắt buộc!" });
  }

  // Mã hóa mật khẩu
  bcrypt.hash(newDocGia.Password, saltRounds, (err, hash) => {
    if (err) {
      console.error("Lỗi mã hóa mật khẩu:", err);
      return res
        .status(500)
        .json({ message: "Lỗi server khi mã hóa mật khẩu" });
    }

    newDocGia.Password = hash; // Gán lại mật khẩu đã mã hóa

    // Tạo độc giả
    DocGiaService.create(newDocGia, (err, result) => {
      if (err) {
        console.error("Lỗi tạo đọc giả", err);
        return res
          .status(500)
          .json({ message: "Lỗi server khi tạo tài khoản" });
      }

      res.status(201).json({ message: "Đăng ký thành công", data: result });
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
    return res.status(400).json({ message: "Thiếu username hoặc password" });
  }

  const sql = "SELECT * FROM DocGia WHERE Username = ?";
  db.query(sql, [Username], (err, results) => {
    if (err) {
      console.error("Lỗi truy vấn", err);
      return res.status(500).json({ message: "Lỗi server" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy tài khoản" });
    }

    const user = results[0];

    bcrypt.compare(Password, user.Password, (err, result) => {
      if (err) {
        console.error("Lỗi so sánh mật khẩu", err);
        return res.status(500).json({ message: "Lỗi server" });
      }

      if (!result) {
        return res.status(401).json({ message: "Sai mật khẩu" });
      }

      // Đăng nhập thành công
      res.json({
        message: "Đăng nhập thành công",
        user: {
          MaDocGia: user.MaDocGia,
          HoLot: user.HoLot,
          Ten: user.Ten,
          Username: user.Username,
        },
      });
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
const getDocGiaByUsername = (req, res) => {
  const { username } = req.params;

  const query = `
    SELECT MaDocGia, HoLot, Ten, NgaySinh, Phai, DiaChi, DienThoai, Username 
    FROM DocGia 
    WHERE Username = ?
  `;

  db.query(query, [username], (err, results) => {
    if (err) return res.status(500).json({ message: "Lỗi server", error: err });

    if (results.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    res.json(results[0]);
  });
};

module.exports = {
  getDocGiaByUsername,
  createDocGia,
  loginDocGia,
  getAllDocGia,
  getDocGiaById,
  updateDocGia,
  deleteDocGia,
  deleteAllDocGia,
};
