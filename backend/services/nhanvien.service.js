const db = require("../config/db");

const NhanVienService = {
  create: (data, callback) => {
    const sql = `
      INSERT INTO NhanVien (HoTenNV, Password, ChucVu, DiaChi, SoDienThoai)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
      data.HoTenNV,
      data.Password, // có thể mã hoá sau
      data.ChucVu,
      data.DiaChi,
      data.SoDienThoai,
    ];
    db.query(sql, values, (err, result) => {
      if (err) return callback(err);
      return callback(null, { id: result.insertId, ...data });
    });
  },

  login: (username, password, callback) => {
    const sql = `
      SELECT * FROM NhanVien WHERE HoTenNV = ? AND Password = ?
    `;
    db.query(sql, [username, password], (err, results) => {
      if (err) return callback(err);
      if (results.length === 0) return callback(null, null);
      return callback(null, results[0]);
    });
  },

  getAll: (callback) => {
    db.query("SELECT * FROM NhanVien", (err, results) => {
      if (err) return callback(err);
      return callback(null, results);
    });
  },
};

module.exports = NhanVienService;
