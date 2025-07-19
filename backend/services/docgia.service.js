const db = require("../config/db.js");

const DocGiaService = {
  create: (data, callback) => {
    const sql = `
      INSERT INTO DocGia (HoLot, Ten, NgaySinh, Phai, DiaChi, DienThoai)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
      data.HoLot,
      data.Ten,
      data.NgaySinh,
      data.Phai,
      data.DiaChi,
      data.DienThoai,
    ];
    db.query(sql, values, (err, result) => {
      if (err) return callback(err);
      return callback(null, { id: result.insertId, ...data });
    });
  },

  // GET ALL
  getAll: (callback) => {
    db.query("SELECT * FROM DocGia", (err, results) => {
      if (err) return callback(err);
      return callback(null, results);
    });
  },

  // GET BY ID
  getById: (id, callback) => {
    db.query(
      "SELECT * FROM DocGia WHERE MaDocGia = ?",
      [id],
      (err, results) => {
        if (err) return callback(err);
        return callback(null, results[0]);
      }
    );
  },

  // UPDATE
  update: (id, data, callback) => {
    const sql = `
      UPDATE DocGia SET HoLot=?, Ten=?, NgaySinh=?, Phai=?, DiaChi=?, DienThoai=?
      WHERE MaDocGia=?
    `;
    const values = [
      data.HoLot,
      data.Ten,
      data.NgaySinh,
      data.Phai,
      data.DiaChi,
      data.DienThoai,
      id,
    ];
    db.query(sql, values, (err, result) => {
      if (err) return callback(err);
      return callback(null, result);
    });
  },

  // DELETE
  delete: (id, callback) => {
    db.query("DELETE FROM DocGia WHERE MaDocGia = ?", [id], (err, result) => {
      if (err) return callback(err);
      return callback(null, result);
    });
  },
  deleteAll: (callback) => {
    db.query("DELETE FROM DocGia", (err, result) => {
      if (err) return callback(err);
      return callback(null, result);
    });
  },
};

module.exports = DocGiaService;
