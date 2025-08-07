import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext"; // 🆕

function Navbar() {
  const { cart } = useCart(); // 🆕
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Đã đăng xuất");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light px-3">
      <Link className="navbar-brand" to="/">
        📚 Thư viện
      </Link>

      <div className="ms-auto d-flex align-items-center gap-3">
        <form className="d-flex me-3">
          <input
            className="form-control"
            type="search"
            placeholder="Tìm sách..."
          />
        </form>

        <Link
          to="/cart"
          className="btn btn-outline-secondary position-relative"
        >
          <FaShoppingCart />
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {cart.reduce((sum, item) => sum + item.SoLuong, 0)}
          </span>
        </Link>

        {user ? (
          <>
            <Link
              to="/detail-user"
              className="d-flex align-items-center text-dark text-decoration-none"
            >
              <FaUser className="me-2" />
              <span>{user.Username}</span>
            </Link>
            <button onClick={handleLogout} className="btn btn-danger">
              Đăng xuất
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline-primary">
              Đăng nhập
            </Link>
            <Link to="/register" className="btn btn-primary">
              Đăng ký
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
