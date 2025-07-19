const db = require("../config/db.js");

const SachService = {
  create: (data, callback) => {
    const sql = `
      INSERT INTO Sach (TenSach, DonGia, SoQuyen, NamXuatBan, MaNXB, TacGia)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
      data.TenSach,
      data.DonGia,
      data.SoQuyen,
      data.NamXuatBan,
      data.MaNXB,
      data.TacGia,
    ];
    db.query(sql, values, (err, result) => {
      if (err) return callback(err);
      return callback(null, { id: result.insertId, ...data });
    });
  },

  getAll: (callback) => {
    db.query("SELECT * FROM Sach", (err, results) => {
      if (err) return callback(err);
      return callback(null, results);
    });
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM Sach WHERE MaSach = ?", [id], (err, results) => {
      if (err) return callback(err);
      return callback(null, results[0]);
    });
  },

  update: (id, data, callback) => {
    const sql = `
      UPDATE Sach SET TenSach=?, DonGia=?, SoQuyen=?, NamXuatBan=?, MaNXB=?, TacGia=?
      WHERE MaSach=?
    `;
    const values = [
      data.TenSach,
      data.DonGia,
      data.SoQuyen,
      data.NamXuatBan,
      data.MaNXB,
      data.TacGia,
      id,
    ];
    db.query(sql, values, (err, result) => {
      if (err) return callback(err);
      return callback(null, result);
    });
  },

  delete: (id, callback) => {
    db.query("DELETE FROM Sach WHERE MaSach = ?", [id], (err, result) => {
      if (err) return callback(err);
      return callback(null, result);
    });
  },

  deleteAll: (callback) => {
    db.query("DELETE FROM Sach", (err, result) => {
      if (err) return callback(err);
      return callback(null, result);
    });
  },
};

module.exports = SachService;
