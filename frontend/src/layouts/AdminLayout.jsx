// layouts/AdminLayout.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";

function AdminLayout() {
  return (
    <div>
      <h1 className="text-center my-4">Hệ thống Quản lý Mượn Sách</h1>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <Link className="navbar-brand" to="/admin/home">
          Trang chủ
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/admin/list-users">
                Danh sách người dùng
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/list-products">
                Danh sách sản phẩm
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container mt-4">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
