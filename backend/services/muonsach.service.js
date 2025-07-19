const db = require("../config/db.js");

const MuonSachService = {
  create: (data, callback) => {
    const sql = `
  INSERT INTO theodoimuonsach (MaDocGia, MaSach, NgayMuon)
  VALUES (?, ?, ?)
`;
    const values = [data.MaDocGia, data.MaSach, data.NgayMuon];

    db.query(sql, values, (err, result) => {
      if (err) return callback(err);
      return callback(null, { id: result.insertId, ...data });
    });
  },

  getAll: (callback) => {
    const sql = `
        SELECT * FROM theodoimuonsach
        ORDER BY NgayMuon DESC
    `;
    db.query(sql, (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  },

  getByDocGia: (id, callback) => {
    db.query(
      "SELECT * FROM TheoDoiMuonSach WHERE MaDocGia = ?",
      [id],
      (err, results) => {
        if (err) return callback(err);
        return callback(null, results);
      }
    );
  },

  traSach: (data, callback) => {
    const sql = `
      UPDATE TheoDoiMuonSach
      SET NgayTra = ?
      WHERE MaDocGia = ? AND MaSach = ? AND NgayMuon = ?
    `;
    const values = [data.NgayTra, data.MaDocGia, data.MaSach, data.NgayMuon];
    db.query(sql, values, (err, result) => {
      if (err) return callback(err);
      return callback(null, result);
    });
  },

  delete: (docgia, sach, ngayMuon, callback) => {
    const sql = `
        DELETE FROM TheoDoiMuonSach
        WHERE MaDocGia = ? AND MaSach = ? AND NgayMuon = ?
    `;
    db.query(sql, [docgia, sach, ngayMuon], (err, result) => {
      if (err) return callback(err);
      return callback(null, result);
    });
  },
};

module.exports = MuonSachService;
