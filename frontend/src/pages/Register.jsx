import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [form, setForm] = useState({
    HoLot: "",
    Ten: "",
    NgaySinh: "",
    Phai: "Nam",
    DiaChi: "",
    DienThoai: "",
    Username: "",
    Password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/docgia", form);
      alert("✅ Đăng ký thành công!");
      setForm({
        HoLot: "",
        Ten: "",
        NgaySinh: "",
        Phai: "Nam",
        DiaChi: "",
        DienThoai: "",
        Username: "",
        Password: "",
      });
    } catch (err) {
      alert("❌ Đăng ký thất bại!");
      console.error(err);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 600 }}>
      <h3 className="text-center mb-4">📝 Đăng ký</h3>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label>Họ lót</label>
            <input
              name="HoLot"
              className="form-control"
              value={form.HoLot}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label>Tên</label>
            <input
              name="Ten"
              className="form-control"
              value={form.Ten}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label>Ngày sinh</label>
            <input
              type="date"
              name="NgaySinh"
              className="form-control"
              value={form.NgaySinh}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label>Phái</label>
            <select
              name="Phai"
              className="form-control"
              value={form.Phai}
              onChange={handleChange}
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>
          <div className="col-md-6">
            <label>Địa chỉ</label>
            <input
              name="DiaChi"
              className="form-control"
              value={form.DiaChi}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label>Điện thoại</label>
            <input
              name="DienThoai"
              className="form-control"
              value={form.DienThoai}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label>Tên đăng nhập</label>
            <input
              name="Username"
              className="form-control"
              value={form.Username}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label>Mật khẩu</label>
            <input
              type="password"
              name="Password"
              className="form-control"
              value={form.Password}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mt-4">
          <button className="btn btn-success w-100" type="submit">
            Đăng ký
          </button>
        </div>
      </form>

      <div className="text-center mt-3">
        <span>Đã có tài khoản? </span>
        <Link to="/login">Đăng nhập ngay</Link>
      </div>
    </div>
  );
}

export default Register;
