const db = require("../config/db");

const NXBService = {
  create: (data, callback) => {
    const sql = "INSERT INTO NhaXuatBan (TenNXB, DiaChi) VALUES (?, ?)";
    const values = [data.TenNXB, data.DiaChi];
    db.query(sql, values, (err, result) => {
      if (err) return callback(err);
      return callback(null, { id: result.insertId, ...data });
    });
  },

  getAll: (callback) => {
    db.query("SELECT * FROM NhaXuatBan", (err, results) => {
      if (err) return callback(err);
      return callback(null, results);
    });
  },
};

module.exports = NXBService;
