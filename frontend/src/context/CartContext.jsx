import React, { createContext, useContext, useState, useEffect } from "react";

// Tạo Context
const CartContext = createContext();

// Custom hook để sử dụng dễ dàng
export const useCart = () => useContext(CartContext);

// Provider để bọc quanh App
export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.MaSach === product.MaSach);
      if (existing) {
        return prev.map((item) =>
          item.MaSach === product.MaSach
            ? { ...item, SoLuong: item.SoLuong + product.SoLuong }
            : item
        );
      } else {
        return [...prev, product];
      }
    });
  };

  const removeFromCart = (MaSach) => {
    setCart((prev) => prev.filter((item) => item.MaSach !== MaSach));
  };

  const placeOrder = () => {
    const newOrder = {
      items: cart,
      timestamp: new Date().toISOString(),
    };
    const updated = [...orders, newOrder];
    setOrders(updated);
    setCart([]); // xóa giỏ hàng
    localStorage.removeItem("cart");
  };

  const cancelOrder = (timestamp) => {
    const updated = orders.filter((order) => order.timestamp !== timestamp);
    setOrders(updated);
  };

  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.SoLuong, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        getTotalQuantity,
        placeOrder,
        orders,
        cancelOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
