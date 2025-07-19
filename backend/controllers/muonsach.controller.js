const MuonSachService = require("../services/muonsach.service");

const muonSach = (req, res) => {
  const data = req.body;
  if (!data.MaDocGia || !data.MaSach || !data.NgayMuon) {
    return res.status(400).json({ message: "Thiếu thông tin!" });
  }
  MuonSachService.create(data, (err, result) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.status(201).json({ message: "Mượn sách thành công" });
  });
};

const getAll = (req, res) => {
  MuonSachService.getAll((err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.json(data);
  });
};

const getByDocGia = (req, res) => {
  MuonSachService.getByDocGia(req.params.id, (err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.json(data);
  });
};

const traSach = (req, res) => {
  const data = req.body;
  if (!data.MaDocGia || !data.MaSach || !data.NgayMuon || !data.NgayTra) {
    return res.status(400).json({ message: "Thiếu thông tin trả sách!" });
  }
  MuonSachService.traSach(data, (err, result) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.json({ message: "Trả sách thành công" });
  });
};

const deleteMuon = (req, res) => {
  const { docgia, sach, ngaymuon } = req.params;
  MuonSachService.delete(docgia, sach, ngaymuon, (err, result) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.json({ message: "Xóa bản ghi mượn thành công" });
  });
};
const deleteAllSach = (req, res) => {
  MuonSachService.deleteAll((err, result) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.json({ message: `Đã xóa ${result.affectedRows} sách` });
  });
};

module.exports = {
  muonSach,
  getAll,
  getByDocGia,
  traSach,
  deleteMuon,
};
