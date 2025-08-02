import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditProduct() {
  const { id } = useParams(); // MaSach
  const navigate = useNavigate();

  const [form, setForm] = useState({
    TenSach: "",
    DonGia: "",
    SoQuyen: "",
    NamXuatBan: "",
    MaNXB: "",
    TacGia: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/sach/${id}`)
      .then((res) => setForm(res.data))
      .catch((err) => console.error("❌ Lỗi khi tải dữ liệu sách:", err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in form) {
        formData.append(key, form[key]);
      }
      if (selectedImage) {
        formData.append("HinhAnh", selectedImage);
      }

      await axios.put(`http://localhost:3000/sach/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Cập nhật thành công!");
      navigate("/admin/list-products");
    } catch (err) {
      console.error("❌ Lỗi khi cập nhật sách:", err);
      alert("Cập nhật thất bại!");
    }
  };

  return (
    <div className="container">
      <h3 className="my-4">Chỉnh sửa thông tin sách</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Tên sách</label>
          <input
            type="text"
            className="form-control"
            name="TenSach"
            value={form.TenSach}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Đơn giá</label>
          <input
            type="number"
            className="form-control"
            name="DonGia"
            value={form.DonGia}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Số quyển</label>
          <input
            type="number"
            className="form-control"
            name="SoQuyen"
            value={form.SoQuyen}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Năm xuất bản</label>
          <input
            type="number"
            className="form-control"
            name="NamXuatBan"
            value={form.NamXuatBan}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mã NXB</label>
          <input
            type="number"
            className="form-control"
            name="MaNXB"
            value={form.MaNXB}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tác giả</label>
          <input
            type="text"
            className="form-control"
            name="TacGia"
            value={form.TacGia}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Hình ảnh (nếu muốn đổi)</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setSelectedImage(e.target.files[0])}
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
