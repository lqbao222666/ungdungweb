import React from "react";
import { Outlet, Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/logo.png";

function HomeLayout() {
  return (
    <div>
      {/* Header với logo và ảnh nền */}
      <div className="bg-dark text-white p-4 d-flex align-items-center justify-content-between">
        <img src={logo} alt="Logo" style={{ height: 50 }} />
        <h2>Hệ thống Mượn Sách</h2>
      </div>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
        <Link to="/" className="navbar-brand">
          Trang chủ
        </Link>
        <div className="ms-auto d-flex gap-3 align-items-center">
          <form className="d-flex me-3">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm sách..."
            />
            <button className="btn btn-outline-success" type="submit">
              Tìm
            </button>
          </form>
          <Link
            to="/cart"
            className="btn btn-outline-secondary position-relative"
          >
            <FaShoppingCart />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              0
            </span>
          </Link>
          <Link to="/login" className="btn btn-outline-primary">
            <FaUser /> Đăng nhập
          </Link>
        </div>
      </nav>

      {/* Nội dung chính */}
      <Outlet />
    </div>
  );
}

export default HomeLayout;
