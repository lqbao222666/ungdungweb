import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [HoTenNV, setHoTenNV] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/nhanvien/login", {
        HoTenNV,
        Password,
      });
      if (res.data && res.data.nhanvien) {
        localStorage.setItem("isLoggedIn", "true");
        alert("Đăng nhập thành công!");
        navigate("/admin/home");
      }
    } catch (err) {
      console.error("Lỗi:", err);
      setError("Lỗi máy chủ hoặc sai thông tin đăng nhập!");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="text-center mb-4">Đăng nhập quản trị</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Tên đăng nhập</label>
          <input
            type="text"
            className="form-control"
            value={HoTenNV}
            onChange={(e) => setHoTenNV(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mật khẩu</label>
          <input
            type="password"
            className="form-control"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Đăng nhập
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminLogin;
