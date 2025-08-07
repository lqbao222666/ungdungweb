import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [form, setForm] = useState({ Username: "", Password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/docgia/login", form);
      const user = res.data.user;

      localStorage.setItem("user", JSON.stringify(user));

      alert("Đăng nhập thành công!");

      window.location.href = "/";
    } catch (err) {
      alert("Đăng nhập thất bại!");
      console.error(err);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 500 }}>
      <h3 className="text-center mb-4">Đăng nhập</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Tên đăng nhập</label>
          <input
            name="Username"
            placeholder="Tên đăng nhập"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Mật khẩu</label>
          <input
            type="password"
            name="Password"
            placeholder="Mật khẩu"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Đăng nhập
        </button>
      </form>

      <div className="text-center mt-3">
        <span>Chưa có tài khoản? </span>
        <Link to="/register">Đăng ký ngay</Link>
      </div>
    </div>
  );
}

export default Login;
