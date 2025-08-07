import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DetailUser() {
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get(`http://localhost:3000/docgia/${user.MaDocGia}`)
      .then((res) => {
        const d = new Date(res.data.NgaySinh);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        const ngaySinh = `${yyyy}-${mm}-${dd}`;

        setInfo({ ...res.data, NgaySinh: ngaySinh });
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Lỗi khi lấy thông tin người dùng:", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    axios
      .put(`http://localhost:3000/docgia/${user.MaDocGia}`, info)
      .then(() => {
        alert("Cập nhật thành công!");
        navigate("/");
      })
      .catch((err) => {
        console.error("Lỗi khi cập nhật thông tin:", err);
        alert("Có lỗi xảy ra khi lưu");
      });
  };

  if (loading) return <div className="container mt-4">Đang tải dữ liệu...</div>;

  return (
    <div className="container mt-4" style={{ maxWidth: 600 }}>
      <h3 className="mb-4">👤 Thông tin tài khoản</h3>

      <div className="mb-3">
        <label>Họ lót</label>
        <input className="form-control" value={info.HoLot || ""} disabled />
      </div>

      <div className="mb-3">
        <label>Tên</label>
        <input className="form-control" value={info.Ten || ""} disabled />
      </div>

      <div className="mb-3">
        <label>Ngày sinh</label>
        <input
          className="form-control"
          type="date"
          name="NgaySinh"
          value={info.NgaySinh || ""}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Giới tính</label>
        <input className="form-control" value={info.Phai || ""} disabled />
      </div>

      <div className="mb-3">
        <label>Số điện thoại</label>
        <input className="form-control" value={info.DienThoai || ""} disabled />
      </div>

      <div className="mb-3">
        <label>Địa chỉ</label>
        <input
          className="form-control"
          name="DiaChi"
          value={info.DiaChi || ""}
          onChange={handleChange}
        />
      </div>

      <button className="btn btn-success" onClick={handleSave}>
        Lưu thay đổi
      </button>
    </div>
  );
}

export default DetailUser;
