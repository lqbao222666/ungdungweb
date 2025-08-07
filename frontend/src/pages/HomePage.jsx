import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get("http://localhost:3000/sach")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Lỗi khi lấy sản phẩm:", err));
  }, []);

  const handleChange = (e, MaSach) => {
    const value = parseInt(e.target.value, 10);
    setQuantities({ ...quantities, [MaSach]: value });
  };

  const handleAddToCart = (sp) => {
    const soLuong = quantities[sp.MaSach] || 1;
    addToCart({ ...sp, SoLuong: soLuong });
    alert(`🛒 Đã thêm ${soLuong} "${sp.TenSach}" vào giỏ hàng!`);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">✨ Sản phẩm nổi bật</h3>
      <div className="row">
        {products.map((sp) => (
          <div key={sp.MaSach} className="col-md-4 mb-4">
            <div className="card h-100 shadow">
              <img
                src={`http://localhost:3000/uploads/${sp.HinhAnh}`}
                className="card-img-top"
                alt={sp.TenSach}
                height="250"
                style={{ objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{sp.TenSach}</h5>
                <p className="card-text">
                  Giá: {Number(sp.DonGia).toLocaleString()}₫
                </p>
                <div className="d-flex mb-2">
                  <input
                    type="number"
                    className="form-control me-2"
                    min="1"
                    value={quantities[sp.MaSach] || 1}
                    onChange={(e) => handleChange(e, sp.MaSach)}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(sp)}
                  >
                    🛒 Thêm vào giỏ
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
