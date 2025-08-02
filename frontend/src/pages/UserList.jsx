import React, { useEffect, useState } from "react";
import axios from "axios";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/docgia")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("❌ Lỗi khi lấy người dùng:", err));
  }, []);

  // Hàm format ngày từ ISO -> dd/mm/yyyy
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("vi-VN");
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Danh sách người dùng đã đăng ký</h3>
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Mã</th>
            <th>Họ tên</th>
            <th>Ngày sinh</th>
            <th>Phái</th>
            <th>Địa chỉ</th>
            <th>Điện thoại</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.MaDocGia}>
              <td>{u.MaDocGia}</td>
              <td>{`${u.HoLot} ${u.Ten}`}</td>
              <td>{formatDate(u.NgaySinh)}</td>
              <td>{u.Phai}</td>
              <td>{u.DiaChi || "—"}</td>
              <td>{u.DienThoai || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
