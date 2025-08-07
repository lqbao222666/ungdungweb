import React from "react";
import { Outlet } from "react-router-dom";
import logo from "../assets/logo.png";
import Navbar from "../components/Navbar";

function HomeLayout() {
  return (
    <div>
      {/* Header với logo và ảnh nền */}
      <div className="bg-dark text-white p-4 d-flex align-items-center justify-content-between">
        <img src={logo} alt="Logo" style={{ height: 50 }} />
        <h2>Hệ thống Mượn Sách</h2>
      </div>

      {/* Navbar có tìm kiếm, giỏ hàng, đăng nhập/đăng xuất */}
      <Navbar />

      {/* Nội dung chính */}
      <Outlet />
    </div>
  );
}

export default HomeLayout;
