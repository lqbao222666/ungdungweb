// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetail() {
  const { id } = useParams(); // Lấy MaSach từ URL
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/sach/${id}`)
      .then((res) => setBook(res.data))
      .catch((err) => console.error("❌ Lỗi khi tải sách:", err));
  }, [id]);

  if (!book)
    return <div className="container mt-4">Đang tải thông tin sách...</div>;

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Hình ảnh bên trái */}
        <div className="col-md-5">
          <img
            src={`http://localhost:3000/uploads/${book.HinhAnh}`}
            alt={book.TenSach}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
        </div>

        {/* Thông tin bên phải */}
        <div className="col-md-7">
          <h2 className="mb-3">{book.TenSach}</h2>
          <p>
            <strong>Tác giả:</strong> {book.TacGia}
          </p>
          <p>
            <strong>Thể loại:</strong> {book.TheLoai}
          </p>
          <p>
            <strong>Nhà xuất bản:</strong> {book.NhaXuatBan}
          </p>
          <p>
            <strong>Năm xuất bản:</strong> {book.NamXuatBan}
          </p>
          <p>
            <strong>Số lượng tồn:</strong> {book.SoLuongTon}
          </p>
          <p>
            <strong>Giá:</strong>{" "}
            <span className="text-danger fw-bold">
              {Number(book.DonGia).toLocaleString()}₫
            </span>
          </p>
          <hr />
          <p>
            <strong>Mô tả:</strong>
          </p>
          <p>{book.MoTa || "Không có mô tả cho sách này."}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
