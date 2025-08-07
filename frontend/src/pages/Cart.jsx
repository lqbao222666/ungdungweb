import React from "react";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart, placeOrder, orders, cancelOrder } = useCart();

  const total = cart.reduce((sum, item) => sum + item.DonGia * item.SoLuong, 0);

  const isWithin12Hours = (timestamp) => {
    const now = new Date();
    const orderTime = new Date(timestamp);
    const diff = (now - orderTime) / (1000 * 60 * 60); // tính giờ
    return diff <= 12;
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Giỏ hàng</h3>

      {/* Nếu chưa đặt */}
      {cart.length > 0 && (
        <>
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Ảnh</th>
                <th>Sách</th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.MaSach}>
                  <td>
                    <img
                      src={`http://localhost:3000/uploads/${item.HinhAnh}`}
                      alt={item.TenSach}
                      width="70"
                      height="90"
                      style={{ objectFit: "cover" }}
                    />
                  </td>
                  <td>{item.TenSach}</td>
                  <td>{Number(item.DonGia).toLocaleString()}₫</td>
                  <td>{item.SoLuong}</td>
                  <td>{(item.DonGia * item.SoLuong).toLocaleString()}₫</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromCart(item.MaSach)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h5 className="text-end">
            Tổng tiền:{" "}
            <span className="text-danger">{total.toLocaleString()}₫</span>
          </h5>

          <div className="text-end">
            <button
              className="btn btn-success mt-3"
              onClick={() => {
                placeOrder();
                alert("Đặt hàng thành công!");
              }}
            >
              Đặt hàng
            </button>
          </div>
        </>
      )}

      {/* Danh sách đơn hàng đã đặt */}
      {orders.length > 0 && (
        <div className="mt-5">
          <h4>Đơn hàng đã đặt</h4>
          {orders.map((order, index) => (
            <div className="card mt-3" key={index}>
              <div className="card-header d-flex justify-content-between align-items-center">
                <strong> {new Date(order.timestamp).toLocaleString()}</strong>
                {isWithin12Hours(order.timestamp) && (
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => cancelOrder(order.timestamp)}
                  >
                    Hủy đặt hàng
                  </button>
                )}
              </div>
              <div className="card-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Tên sách</th>
                      <th>Giá</th>
                      <th>Số lượng</th>
                      <th>Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item) => (
                      <tr key={item.MaSach}>
                        <td>{item.TenSach}</td>
                        <td>{Number(item.DonGia).toLocaleString()}₫</td>
                        <td>{item.SoLuong}</td>
                        <td>
                          {(item.DonGia * item.SoLuong).toLocaleString()}₫
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
