import React, { useState } from "react";
import axios from "axios";

function AddProduct() {
  const [product, setProduct] = useState({
    TenSach: "",
    DonGia: "",
    SoQuyen: "",
    NamXuatBan: "",
    MaNXB: "",
    TacGia: "",
  });
  const [HinhAnh, setHinhAnh] = useState(null);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setHinhAnh(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in product) {
      formData.append(key, product[key]);
    }
    formData.append("HinhAnh", HinhAnh);

    try {
      await axios.post("http://localhost:3000/sach/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("✅ Thêm sách thành công!");
      setProduct({
        TenSach: "",
        DonGia: "",
        SoQuyen: "",
        NamXuatBan: "",
        MaNXB: "",
        TacGia: "",
      });
      setHinhAnh(null);
    } catch (err) {
      console.error("❌ Lỗi:", err);
      alert("Thêm sách thất bại!");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4 text-center">Thêm Sách Mới</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Tên Sách</label>
          <input
            type="text"
            className="form-control"
            name="TenSach"
            value={product.TenSach}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Đơn Giá</label>
          <input
            type="number"
            className="form-control"
            name="DonGia"
            value={product.DonGia}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Số Quyển</label>
          <input
            type="number"
            className="form-control"
            name="SoQuyen"
            value={product.SoQuyen}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Năm Xuất Bản</label>
          <input
            type="number"
            className="form-control"
            name="NamXuatBan"
            value={product.NamXuatBan}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Mã NXB</label>
          <input
            type="number"
            className="form-control"
            name="MaNXB"
            value={product.MaNXB}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Tác Giả</label>
          <input
            type="text"
            className="form-control"
            name="TacGia"
            value={product.TacGia}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Hình Ảnh</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-success">
            Thêm Sách
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
