import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/sach");
      setProducts(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy sản phẩm:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Lọc sản phẩm theo từ khóa (không phân biệt hoa thường)
  const filteredProducts = products.filter((sp) =>
    sp.TenSach.toLowerCase().includes(keyword.toLowerCase())
  );

  const handleDelete = async (maSach) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này không?")) {
      try {
        await axios.delete(`http://localhost:3000/sach/${maSach}`);
        setProducts(products.filter((sp) => sp.MaSach !== maSach));
      } catch (err) {
        alert("Không thể xóa sản phẩm!");
        console.error(err);
      }
    }
  };

  return (
    <div>
      <h3 className="mb-3">Danh sách sản phẩm</h3>

      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm theo tên sách..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div className="col-md-6 text-end">
          <Link to="/admin/add-product" className="btn btn-success">
            Thêm sản phẩm
          </Link>
        </div>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Mã sách</th>
            <th>Tên sách</th>
            <th>Đơn giá</th>
            <th>Số quyển</th>
            <th>Năm XB</th>
            <th>NXB</th>
            <th>Tác giả</th>
            <th>Hình ảnh</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((sp) => (
            <tr key={sp.MaSach}>
              <td>{sp.MaSach}</td>
              <td>{sp.TenSach}</td>
              <td>{sp.DonGia}</td>
              <td>{sp.SoQuyen}</td>
              <td>{sp.NamXuatBan}</td>
              <td>{sp.MaNXB}</td>
              <td>{sp.TacGia}</td>
              <td>
                <img
                  src={`http://localhost:3000/uploads/${sp.HinhAnh}`}
                  alt="Ảnh sách"
                  width="80"
                  height="100"
                />
              </td>
              <td>
                <Link
                  to={`/admin/edit-product/${sp.MaSach}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Sửa
                </Link>
                <button
                  onClick={() => handleDelete(sp.MaSach)}
                  className="btn btn-danger btn-sm"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
